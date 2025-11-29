// MarineAI.tsx (or .jsx)
// Full, corrected component — paste/replace your existing MarineAI component file with this.

import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { toast } from "sonner";
import { marked } from "marked";
import {
  Sparkles,
  X,
  Send,
  Minimize2,
  Maximize2,
  User,
  MapPin,
  Camera,
  Send as SendIcon,
  Brain
} from "lucide-react";
import chatbotIcon from "figma:asset/3a1471360940bb2ce4a946b315d10676ba9d6ab3.png";

// ---------- helper: sendToBackend ----------
async function sendToBackend(message: string) {
  try {
    const res = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    const data = await res.json();
    return data.response || "";
  } catch (err) {
    console.error("Backend error", err);
    return "Error: Unable to contact Marine AI server.";
  }
}

// ---------- MarineAIIcon ----------
const MarineAIIcon = ({ className, isActive = false }: { className?: string; isActive?: boolean }) => (
  <div className={`relative ${className}`}>
    <img src={chatbotIcon} alt="Marine AI Chatbot" className="w-full h-full object-contain" />
    {isActive && <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-400 rounded-full animate-pulse" />}
  </div>
);

// ---------- Types ----------
interface MarineAIProps {
  user?: any;
  onNavigate?: (page: string) => void;
  currentPage?: string;
}

interface Location {
  latitude: number;
  longitude: number;
  accuracy?: number;
  address?: string;
}

interface AttachedImage {
  id: string;
  file: File;
  preview: string;
  description?: string;
}

interface Message {
  id: string;
  type: "user" | "ai";
  content: string; // will contain HTML produced by convertAIResponse()
  timestamp: Date;
  suggestions?: string[];
  location?: Location;
  images?: AttachedImage[];
}

// ---------- Component ----------
export function MarineAI({ user, onNavigate, currentPage }: MarineAIProps) {
  // UI state
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [attachedImages, setAttachedImages] = useState<AttachedImage[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // initial welcome
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcome: Message = {
        id: "welcome",
        type: "ai",
        content: `<div><strong>Hello${user ? ` ${user.email?.split?.("@")?.[0] ?? ""}` : ""}!</strong> I'm Marine AI 🌊🧠 — your marine research assistant. Try "Analyze uploaded images" or "Share my location".</div>`,
        timestamp: new Date(),
        suggestions: ["Analyze uploaded images", "Share my location", "Show data trends"],
      };
      setMessages([welcome]);
    }
  }, [isOpen, user]);

  // ---------- Location & file handlers ----------
  const requestLocation = async () => {
    setIsLoadingLocation(true);
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported");
      setIsLoadingLocation(false);
      return;
    }
    try {
      const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true, timeout: 10000 });
      });
      const loc: Location = { latitude: pos.coords.latitude, longitude: pos.coords.longitude, accuracy: pos.coords.accuracy };
      // try reverse geocode (optional)
      try {
        const r = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${loc.latitude}&lon=${loc.longitude}`);
        if (r.ok) {
          const d = await r.json();
          loc.address = d.display_name;
        }
      } catch (e) {
        // ignore
      }
      setCurrentLocation(loc);
      toast.success("Location captured");
      return loc;
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Failed to get location");
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) {
        toast.error(`${file.name} is not an image`);
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast.error(`${file.name} too large (max 10MB)`);
        return;
      }
      const reader = new FileReader();
      reader.onload = (ev) => {
        const img: AttachedImage = { id: Date.now().toString() + Math.random().toString(36).slice(2), file, preview: ev.target?.result as string };
        setAttachedImages((p) => [...p, img]);
        toast.success(`${file.name} attached`);
      };
      reader.readAsDataURL(file);
    });
    if (e.target) e.target.value = "";
  };

  const removeImage = (id: string) => setAttachedImages((p) => p.filter((x) => x.id !== id));

  // ---------- UNIVERSAL PARSERS & CONVERTERS ----------
  // sanitize stray quotes and broken `">Image Link` artifacts
  function sanitizeBrokenLinkText(text) {
  if (!text) return "";

  return text
    .replace(/"\s*>?\s*Image Link/gi, "")
    .replace(/Image:\s*\[Link.*?\n/gi, "")   // remove "Image: [Link to"
    .replace(/\[Link to.*?\)/gi, "")         // remove broken brackets
    .replace(/\(http.*?"\)/gi, (m) => m.replace(/"/g, "")) 
    .replace(/\"\s*$/g, "")
    .replace(/\u00A0/g, " ");
}


  // return absolute/preview url for display (convert TIFF via backend endpoint)
  function toPreviewUrl(rawUrl) {
  if (!rawUrl) return "";

  let url = rawUrl.trim().replace(/(^<|>$)/g, "");
  url = url.replace(/^["']|["']$/g, "");

  if (url.startsWith("/")) {
    url = `http://localhost:5000${url}`;
  }

  if (!/^https?:\/\//i.test(url) && /^[\w.-]+\//.test(url)) {
    url = "http://" + url;
  }

  if (/\.(tif|tiff)$/i.test(url)) {
    return `http://localhost:5000/convert-tiff?url=${encodeURIComponent(url)}`;
  }

  return url;
}


  // robust URL finder inside a line (returns first url found or null)
  function findUrlInLine(line: string) {
    if (!line) return null;
    // markdown link [text](url)
    const md = /\[[^\]]*\]\((.*?)\)/.exec(line);
    if (md && md[1]) return md[1].replace(/['"]/g, "");
    // bare url
    const bare = /(https?:\/\/[^\s)]+)/i.exec(line);
    if (bare) return bare[1];
    // relative path like /aforo-result/...
    const rel = /(\/[\w\-\./]+\.(tif|tiff|jpg|jpeg|png|gif))/i.exec(line);
    if (rel) return rel[1];
    // host/path without protocol
    const hostpath = /((?:[\w.-]+\/)[^\s)]+)/i.exec(line);
    if (hostpath && /\.(tif|tiff|jpg|jpeg|png|gif)/i.test(hostpath[1])) return hostpath[1];
    return null;
  }

  // Extract images with associated species & description (works with mixed formats)
  function extractImageBlocks(rawText: string) {
    const text = sanitizeBrokenLinkText(rawText || "");
    // Split into lines and remove empty lines but keep order
    const lines = text.split(/\r?\n/);
    const blocks: { species: string; url: string; description: string }[] = [];

    // strategy:
    // iterate lines; whenever we find a line containing a URL (or markdown link),
    // take previous non-empty line as species (if available), and collect following lines
    // as description until next URL (or EOF). This handles formats A/B/C.
    let i = 0;
    while (i < lines.length) {
      const line = lines[i].trim();
      const url = findUrlInLine(line);
      if (url) {
        // species: look back for previous non-empty non-url line
        let species = "Unknown species";
        for (let j = i - 1; j >= 0; j--) {
          const prev = lines[j].trim();
          if (!prev) continue;
          // if previous line is purely a URL skip; else use it as species
          if (!findUrlInLine(prev)) {
            species = prev;
            break;
          }
        }

        // collect description lines after current line until next URL or blank separator
        let descLines: string[] = [];
        let k = i + 1;
        while (k < lines.length) {
          const nl = lines[k].trim();
          if (!nl) {
            // blank line: stop collecting description (but allow brief blanks)
            k++;
            // break so that separated blocks remain separate
            break;
          }
          // if next line contains a url, stop (next block)
          if (findUrlInLine(nl)) break;
          descLines.push(nl);
          k++;
        }

        const cleanedUrl = url.replace(/['"]/g, "").trim();
        blocks.push({ species, url: cleanedUrl, description: descLines.join("\n") });
        i = k;
        continue;
      }
      i++;
    }

    return blocks;
  }

  // convert each block to HTML: species header, image tag (previewUrl), fullres button, description (markdown -> html)
  function renderBlocksToHtml(blocks: { species: string; url: string; description: string }[]) {
    if (!blocks || blocks.length === 0) return "";
    return blocks
      .map((b, idx) => {
        const preview = toPreviewUrl(b.url);
        const safeDescHtml = marked.parse(sanitizeBrokenLinkText(b.description || ""));
        // image element: clicking will use a custom event but we'll use React click handler; so include data-preview attribute
        // We'll embed the preview src and original url for the "Open Full Resolution".
        return `
          <div class="mb-4 border rounded-lg p-3 bg-white/80 shadow-sm" data-block-index="${idx}">
            <div class="mb-2">
              <div class="text-sm text-slate-600">Species</div>
              <div class="text-lg font-semibold text-[#003366]">${escapeHtml(b.species)}</div>
            </div>

            <div class="image-area mb-2">
              <img
                src="${escapeAttr(preview)}"
                data-full="${escapeAttr(b.url)}"
                class="w-full max-h-[320px] object-contain rounded-md cursor-zoom-in preview-image"
                loading="lazy"
                style="transition: transform .18s ease;"
                onclick="window.dispatchEvent(new CustomEvent('marine-preview', { detail: { preview: '${escapeAttr(preview)}', full: '${escapeAttr(
          b.url
        )}' } }))"
              />
            </div>

            <div class="flex gap-2 items-center mb-2">
<a href="${escapeAttr(toPreviewUrl(b.url))}" 
   target="_blank"
   rel="noreferrer"
   class="inline-block px-3 py-1 rounded-md text-sm bg-[#003366] text-white hover:bg-[#004080]">
  Open Full Resolution
</a>

            </div>

            <div class="description text-sm text-slate-800">
              ${safeDescHtml}
            </div>
          </div>
        `;
      })
      .join("");
  }

  // small helpers to avoid injection from AI raw lines (we still rely on marked for description)
  function escapeHtml(s: string) {
    if (!s) return "";
    return s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c] as string));
  }
  function escapeAttr(s: string) {
    if (!s) return "";
    return s.replace(/"/g, "&quot;");
  }

  // ---------- Convert the whole AI reply to final HTML content ----------
  function convertAIResponseToHtml(aiText: string) {
    if (!aiText) return "";
    const cleaned = sanitizeBrokenLinkText(aiText);
    const blocks = extractImageBlocks(cleaned);
    const blocksHtml = renderBlocksToHtml(blocks);

    // Remove the handled markdown links from full text to avoid duplication
    let textWithoutImageLinks = cleaned.replace(/\[?(?:Image\s*Link|Image|Link)\]?\([^)]+\)/gi, "");
    // Also remove bare URLs we've embedded to keep description clean
    textWithoutImageLinks = textWithoutImageLinks.replace(/https?:\/\/[^\s)]+/gi, "");

    // Convert remaining text to HTML via marked
    const remainingHtml = marked.parse(textWithoutImageLinks);

    // For Option 1 (image + text per image) we already put description under each image.
    // So final HTML: blocksHtml + remainingHtml (remaining textual analysis if any)
    return `${blocksHtml}${remainingHtml}`;
  }

  // ---------- SEND message ----------
  const handleSendMessage = async () => {
    if (!inputMessage.trim() && attachedImages.length === 0) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: escapeHtml(inputMessage),
      timestamp: new Date(),
    };

    setMessages((p) => [...p, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // call your backend /chat
    const backendReply = await sendToBackend(userMessage.content);

    // convert backend raw text into html blocks + text
    const aiHtml = convertAIResponseToHtml(backendReply);

    const aiMessage: Message = {
      id: Date.now().toString(),
      type: "ai",
      content: aiHtml,
      timestamp: new Date(),
    };

    setMessages((p) => [...p, aiMessage]);
    setIsTyping(false);
  };

  // react to global custom events triggered by the inline img onclick (we used window.dispatchEvent to interop)
  useEffect(() => {
    const handler = (e: any) => {
      // detail: { preview, full }
      if (!e?.detail) return;
      const preview = e.detail.preview;
      setPreviewImage(preview);
    };
    window.addEventListener("marine-preview", handler);
    return () => window.removeEventListener("marine-preview", handler);
  }, []);

  // keyboard handler
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // suggestion click
  const handleSuggestionClick = (s: string) => setInputMessage(s);

  // small format time
  const formatTime = (date: Date) => date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  // ---------- JSX ----------
  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative group flex flex-col items-center">
          <div className="absolute inset-0 bg-[#003366] rounded-full animate-ping opacity-30 top-0" />
          <Button
            size="lg"
            onClick={() => setIsOpen(true)}
            className="relative bg-gradient-to-r from-[#003366] to-[#004080] text-white rounded-full h-16 w-16 p-0 shadow-xl transition-all duration-300 hover:scale-110 mb-2"
          >
            <div className="flex items-center justify-center w-full h-full">
              <MarineAIIcon className="h-10 w-10" isActive />
              <Sparkles className="h-3 w-3 absolute top-1 right-1 animate-pulse text-cyan-300" />
            </div>
          </Button>

          <div className="bg-gradient-to-r from-[#003366] to-[#004080] text-white text-xs px-3 py-1 rounded-full shadow-lg border border-blue-300/30 whitespace-nowrap">
            <div className="flex items-center space-x-1">
              <span className="font-medium">Marine AI</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${isMinimized ? "w-80 h-16" : "w-96 h-[600px]"}`}>
      <Card className="h-full shadow-2xl border-2 border-[#003366]/20 bg-white">
        <CardHeader className="pb-3 bg-gradient-to-r from-[#003366] to-[#004080] text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-full">
                <MarineAIIcon className="h-5 w-5" isActive />
              </div>
              <div>
                <CardTitle className="text-lg flex items-center">
                  <span className="font-semibold">Marine AI</span>
                  <Sparkles className="h-4 w-4 ml-2 text-cyan-300 animate-pulse" />
                </CardTitle>
                <CardDescription className="text-blue-100 text-sm">Your Intelligent Marine Assistant</CardDescription>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={() => setIsMinimized(!isMinimized)} className="text-white h-8 w-8 p-0">
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="text-white h-8 w-8 p-0">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {!isMinimized && (
            <div className="flex items-center space-x-2 mt-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800 flex items-center text-xs">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse" />
                Online
              </Badge>
              {user && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                  {user.role}
                </Badge>
              )}
              {currentPage && (
                <Badge variant="secondary" className="bg-purple-100 text-purple-800 text-xs">
                  {currentPage.replace("-", " ")}
                </Badge>
              )}
            </div>
          )}
        </CardHeader>

        {!isMinimized && (
          <>
            <CardContent className="flex-1 p-0">
              <ScrollArea className="h-96 p-4">
                <div className="space-y-4">
                  {messages.map((m) => (
                    <div key={m.id} className={`flex ${m.type === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`flex items-start space-x-2 max-w-[80%] ${m.type === "user" ? "flex-row-reverse space-x-reverse" : ""}`}>
                        <div className={`p-2 rounded-full ${m.type === "user" ? "bg-[#003366]" : "bg-gradient-to-r from-blue-100 to-cyan-100"}`}>
                          {m.type === "user" ? <User className="h-4 w-4 text-white" /> : <MarineAIIcon className="h-4 w-4" />}
                        </div>

                        <div className={`rounded-lg p-3 ${m.type === "user" ? "bg-[#003366] text-white" : "bg-gray-100 text-gray-900"}`}>
                          <div className="prose prose-invert max-w-full break-words" dangerouslySetInnerHTML={{ __html: m.content }} />

                          {m.location && (
                            <div className={`mt-2 p-2 rounded ${m.type === "user" ? "bg-blue-800/50" : "bg-blue-50"} border ${m.type === "user" ? "border-blue-600" : "border-blue-200"}`}>
                              <div className="flex items-center space-x-1">
                                <MapPin className="h-3 w-3 text-blue-600" />
                                <span className="text-xs text-blue-700">
                                  Location: {m.location.latitude.toFixed(4)}, {m.location.longitude.toFixed(4)}
                                </span>
                              </div>
                              {m.location.address && <p className="text-xs mt-1 text-blue-600">{m.location.address}</p>}
                            </div>
                          )}

                          {m.images && m.images.length > 0 && (
                            <div className="mt-2 grid grid-cols-2 gap-2">
                              {m.images.map((img) => (
                                <div key={img.id} className="relative group">
                                  <img src={img.preview} alt={img.file.name} className="w-full h-20 object-cover rounded border" />
                                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded flex items-center justify-center">
                                    <span className="text-white text-xs px-1">{img.file.name}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          <p className={`text-xs mt-1 ${m.type === "user" ? "text-blue-200" : "text-gray-500"}`}>{formatTime(m.timestamp)}</p>

                          {m.suggestions && m.suggestions.length > 0 && (
                            <div className="mt-3 space-y-1">
                              <p className="text-xs text-gray-600 mb-2">Try asking:</p>
                              {m.suggestions.map((s, i) => (
                                <Button key={i} variant="outline" size="sm" onClick={() => handleSuggestionClick(s)} className="text-xs mr-1 mb-1 h-7 bg-white">
                                  {s}
                                </Button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="flex items-start space-x-2">
                        <div className="p-2 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100">
                          <MarineAIIcon className="h-4 w-4" isActive />
                        </div>
                        <div className="bg-gray-100 rounded-lg p-3">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div ref={messagesEndRef} />
              </ScrollArea>
            </CardContent>

            {/* Attachment / Location preview */}
            {(attachedImages.length > 0 || currentLocation) && (
              <div className="px-4 py-2 border-t bg-gray-50">
                <div className="space-y-2">
                  {currentLocation && (
                    <div className="flex items-center justify-between bg-blue-50 p-2 rounded border">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-blue-700">
                          Location: {currentLocation.latitude.toFixed(4)}, {currentLocation.longitude.toFixed(4)}
                        </span>
                      </div>
                      <Button size="sm" variant="ghost" onClick={() => setCurrentLocation(null)} className="h-6 w-6 p-0 text-blue-600">
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  )}

                  {attachedImages.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {attachedImages.map((img) => (
                        <div key={img.id} className="relative group">
                          <img src={img.preview} alt={img.file.name} className="w-12 h-12 object-cover rounded border" />
                          <Button size="sm" variant="destructive" onClick={() => removeImage(img.id)} className="absolute -top-1 -right-1 h-4 w-4 p-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                            <X className="h-2 w-2" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <Button size="sm" variant="outline" onClick={requestLocation} disabled={isLoadingLocation} className="h-10 w-10 p-0">
                    {isLoadingLocation ? <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" /> : <MapPin className="h-4 w-4" />}
                  </Button>

                  <Button size="sm" variant="outline" onClick={() => fileInputRef.current?.click()} className="h-10 w-10 p-0">
                    <Camera className="h-4 w-4" />
                  </Button>

                  <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
                </div>

                <Input value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} onKeyPress={handleKeyPress} placeholder="Ask Marine AI anything..." className="flex-1" />

                <Button onClick={handleSendMessage} disabled={(!inputMessage.trim() && attachedImages.length === 0) || isTyping} className="bg-[#003366] hover:bg-[#004080] h-10 w-10 p-0">
                  <SendIcon className="h-4 w-4" />
                </Button>
              </div>

              {/* quick actions */}
              <div className="flex flex-wrap gap-2 mt-3">
                <Button variant="outline" size="sm" onClick={() => handleSuggestionClick("Help me navigate the platform")} className="text-xs h-7">
                  <SendIcon className="h-3 w-3 mr-1" />
                  Navigation
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleSuggestionClick("Show me data analysis features")} className="text-xs h-7">
                  <SendIcon className="h-3 w-3 mr-1" />
                  Analysis
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleSuggestionClick("Explain research methodologies")} className="text-xs h-7">
                  <SendIcon className="h-3 w-3 mr-1" />
                  Research
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>

      {/* full-screen preview modal */}
      {previewImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[9999]" onClick={() => setPreviewImage(null)}>
          <img src={previewImage} className="max-w-[94%] max-h-[94%] rounded-lg shadow-2xl" alt="Preview" />
        </div>
      )}
    </div>
  );
}
