import { Card } from "@/components/ui/card";
import { PenTool, Heart, Pen, Users } from 'lucide-react';

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-transparent bg-clip-text">
            About AI Poem Writer ✍️
          </h1>
          <p className="text-xl text-gray-600">
            Empowering creativity through AI-powered poetry generation
          </p>
        </div>
        
        <div className="gradient-border mb-16">
          <div className="p-8 text-center">
            <p className="text-xl leading-relaxed text-gray-700">
              Welcome to AI Poem Writer, where we combine advanced AI technology with
              creative writing to help you craft beautiful, meaningful poems for any
              occasion. Our platform makes it easy to express your thoughts and emotions
              through the power of poetry. ✨
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="p-8 hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-200">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                <PenTool className="h-8 w-8 text-blue-500" />
              </div>
              <h2 className="text-2xl font-semibold">Our Mission ✨</h2>
              <p className="text-gray-600">
                Making poetry accessible to everyone by providing an intuitive AI-powered
                platform for creative expression and emotional storytelling.
              </p>
            </div>
          </Card>

          <Card className="p-8 hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-200">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                <Heart className="h-8 w-8 text-blue-500" />
              </div>
              <h2 className="text-2xl font-semibold">Our Values ❤️</h2>
              <p className="text-gray-600">
                We believe in the power of words to inspire, connect, and move people,
                making poetry creation accessible to everyone through technology.
              </p>
            </div>
          </Card>
        </div>

        <div className="space-y-12 mb-16">
          <section className="text-center">
            <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <Pen className="h-8 w-8 text-blue-500" />
            </div>
            <h2 className="text-3xl font-semibold mb-4">How It Works ✨</h2>
            <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Our AI-powered platform combines creative writing algorithms with customizable
              templates to help you create beautiful poems. Choose your style, tone, and
              theme, and let our AI assist you in crafting the perfect piece.
            </p>
          </section>

          <section className="text-center">
            <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <Users className="h-8 w-8 text-blue-500" />
            </div>
            <h2 className="text-3xl font-semibold mb-4">Our Commitment 🤝</h2>
            <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
              We're dedicated to providing a creative, supportive environment for poetry
              creation. Our tool is continuously improved based on user feedback to ensure
              we meet the highest standards of creativity and usability.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}