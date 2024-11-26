import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Copy, Coffee, Check, Sparkles, PenTool, Heart, Star, BookOpen, Zap } from 'lucide-react';
import { genAI, isApiConfigured } from '@/lib/gemini';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SupportBox = () => (
  <Card className="p-8 bg-gradient-to-br from-neutral-50 to-neutral-100 border-2 border-neutral-200 mb-8">
    <div className="text-center space-y-4">
      <Coffee className="h-12 w-12 mx-auto text-amber-500" />
      <h2 className="text-2xl font-bold">Support Our Work ❤️</h2>
      <p className="text-neutral-600 max-w-xl mx-auto">
        Help us maintain and improve our AI poetry tools by supporting our API & hosting costs. 
        Your contribution helps keep this tool free for everyone! 🙏
      </p>
      <a
        href="https://roihacks.gumroad.com/coffee"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block"
      >
        <Button 
          size="lg" 
          className="text-lg px-8 bg-amber-500 hover:bg-amber-600 text-white"
        >
          <Coffee className="mr-2 h-5 w-5" />
          Buy Us a Coffee ☕
        </Button>
      </a>
    </div>
  </Card>
);

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('free-verse');
  const [poem, setPoem] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generatePoem = async () => {
    if (!prompt.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      if (!isApiConfigured()) {
        throw new Error("API key not configured. Please add your Gemini API key to continue.");
      }
      
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const promptText = `Write a ${style} poem about: ${prompt}. 
      Make it creative, meaningful, and emotionally resonant.
      Format the poem with proper line breaks and stanzas.`;
      
      const result = await model.generateContent(promptText);
      setPoem(result.response.text().trim());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while generating the poem');
      setPoem('');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(poem);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-6 text-neutral-800 leading-tight">
            Free AI Poem Writer ✍️
          </h1>
          <p className="text-xl text-neutral-600">
            Create beautiful, meaningful poems with AI assistance - completely free! 🎨
          </p>
        </div>
        
        <div className="gradient-border mb-8">
          <div className="p-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-neutral-700">
                  Poetry Style
                </label>
                <Select
                  value={style}
                  onValueChange={setStyle}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="free-verse">Free Verse</SelectItem>
                    <SelectItem value="haiku">Haiku</SelectItem>
                    <SelectItem value="sonnet">Sonnet</SelectItem>
                    <SelectItem value="limerick">Limerick</SelectItem>
                    <SelectItem value="acrostic">Acrostic</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Textarea
                placeholder="✍️ Describe what you'd like your poem to be about..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[150px] text-lg border-2 focus:border-neutral-400"
              />
              
              <Button 
                onClick={generatePoem}
                disabled={loading || !prompt.trim()}
                className="w-full text-lg py-6 bg-neutral-800 hover:bg-neutral-900 text-white"
              >
                {loading ? (
                  <>
                    <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                    Creating Your Poem...
                  </>
                ) : (
                  <>
                    <PenTool className="mr-2 h-5 w-5" />
                    Generate Poem ✨
                  </>
                )}
              </Button>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>

        {poem && (
          <div className="space-y-6 mb-12">
            <Card className="p-6 hover:shadow-lg transition-all duration-300 border-2 hover:border-neutral-200">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Your Generated Poem</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 hover:bg-neutral-50"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        <span>Copy</span>
                      </>
                    )}
                  </Button>
                </div>
                <div className="prose prose-neutral max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {poem}
                  </ReactMarkdown>
                </div>
              </div>
            </Card>
          </div>
        )}

        <SupportBox />

        <div className="space-y-12 mb-16">
          <section className="bg-white rounded-xl p-8 shadow-lg border-2 border-neutral-100">
            <h2 className="text-3xl font-bold mb-6 text-center">
              Free AI Poem Writer: Your Creative Writing Assistant 🎨
            </h2>
            <div className="space-y-6">
              <p className="text-lg text-neutral-700 leading-relaxed">
                Welcome to the internet's favorite free AI poem writer! Our advanced artificial intelligence
                helps you create beautiful, meaningful poems for any occasion - completely free of charge.
                Whether you're writing a love poem, birthday wish, or expressing your deepest emotions,
                our AI poetry generator is here to help.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <Card className="p-6 text-center">
                  <Star className="h-8 w-8 mx-auto text-yellow-500 mb-4" />
                  <h3 className="font-semibold mb-2">100% Free</h3>
                  <p className="text-sm text-neutral-600">Create unlimited poems with our free AI writer</p>
                </Card>

                <Card className="p-6 text-center">
                  <Zap className="h-8 w-8 mx-auto text-blue-500 mb-4" />
                  <h3 className="font-semibold mb-2">Instant Results</h3>
                  <p className="text-sm text-neutral-600">Generate poems in seconds with AI assistance</p>
                </Card>

                <Card className="p-6 text-center">
                  <BookOpen className="h-8 w-8 mx-auto text-green-500 mb-4" />
                  <h3 className="font-semibold mb-2">Multiple Styles</h3>
                  <p className="text-sm text-neutral-600">Choose from various poetry styles and tones</p>
                </Card>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6">
              Why Choose Our Free AI Poem Generator? 🌟
            </h2>
            <div className="space-y-4">
              <p className="text-neutral-700">
                Our free AI poem writer stands out from other poetry generators because:
              </p>
              <ul className="list-disc pl-6 space-y-3 text-neutral-600">
                <li>No registration required - start writing poems instantly</li>
                <li>Advanced AI technology for high-quality, creative results</li>
                <li>Multiple poetry styles including sonnets, haikus, and free verse</li>
                <li>Perfect for both beginners and experienced poets</li>
                <li>Regular updates and improvements to our AI model</li>
                <li>User-friendly interface for seamless poem creation</li>
              </ul>
            </div>
          </section>

          <section className="bg-white rounded-xl p-8 shadow-lg border-2 border-neutral-100">
            <h2 className="text-2xl font-bold mb-6">
              How to Use Our Free Poetry Generator 📝
            </h2>
            <div className="space-y-4">
              <ol className="list-decimal pl-6 space-y-4 text-neutral-600">
                <li>
                  <strong>Choose Your Style:</strong> Select from various poetry styles like free verse,
                  haiku, sonnet, or limerick
                </li>
                <li>
                  <strong>Set the Tone:</strong> Pick the emotional tone that matches your poem's purpose
                </li>
                <li>
                  <strong>Describe Your Idea:</strong> Share what you want your poem to be about
                </li>
                <li>
                  <strong>Generate:</strong> Click the button and let our AI create your poem
                </li>
                <li>
                  <strong>Customize:</strong> Edit and refine the generated poem to make it perfect
                </li>
              </ol>
            </div>
          </section>

          <section className="bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6">
              Perfect for Every Occasion ✨
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Personal Expression</h3>
                <ul className="space-y-2 text-neutral-600">
                  <li>• Love poems</li>
                  <li>• Emotional expression</li>
                  <li>• Personal reflections</li>
                  <li>• Nature poetry</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Special Events</h3>
                <ul className="space-y-2 text-neutral-600">
                  <li>• Wedding vows</li>
                  <li>• Birthday wishes</li>
                  <li>• Anniversary poems</li>
                  <li>• Celebration verses</li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        <SupportBox />
      </div>
    </div>
  );
}