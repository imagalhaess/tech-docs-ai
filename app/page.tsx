"use client";

import { useState } from "react";
import { Search, BookOpen, Save, Lightbulb } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import SearchForm from "@/components/SearchForm";
import TechSummary from "@/components/TechSummary";
import Categories from "@/components/Categories";
import Header from "@/components/Header";

export default function Home() {
  const { user } = useAuth();
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar documentação");
      }

      const data = await response.json();
      setSearchResults([data, ...searchResults]);
    } catch (error) {
      console.error("Erro na busca:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Tech Docs AI
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Pesquise qualquer tecnologia e obtenha resumos estruturados e
            didáticos da documentação oficial
          </p>

          <SearchForm onSearch={handleSearch} isLoading={isLoading} />
        </div>

        {/* Features */}
        <section
          className="grid md:grid-cols-3 gap-8 mb-12"
          aria-labelledby="features-heading"
        >
          <h2 id="features-heading" className="sr-only">
            Funcionalidades da aplicação
          </h2>
          <div className="text-center">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Busca Inteligente</h3>
            <p className="text-gray-600">
              Pesquise por qualquer tecnologia e obtenha informações
              estruturadas
            </p>
          </div>

          <div className="text-center">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Resumos Didáticos</h3>
            <p className="text-gray-600">
              Documentação organizada em tópicos fáceis de entender
            </p>
          </div>

          <div className="text-center">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Save className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Organize Seus Estudos
            </h3>
            <p className="text-gray-600">
              Salve resumos em categorias personalizadas
            </p>
          </div>
        </section>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Resultados da Busca</h2>
            <div className="space-y-6">
              {searchResults.map((result, index) => (
                <TechSummary key={index} summary={result} />
              ))}
            </div>
          </div>
        )}

        {/* Categories Section - Only for logged in users */}
        {user && <Categories />}

        {/* Suggestions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <Lightbulb className="w-6 h-6 text-yellow-500 mr-2" />
            <h3 className="text-xl font-semibold">Tecnologias Populares</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              "React",
              "Node.js",
              "Python",
              "TypeScript",
              "Next.js",
              "Vue.js",
              "Express",
              "MongoDB",
            ].map((tech) => (
              <button
                key={tech}
                onClick={() => handleSearch(tech)}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors"
              >
                {tech}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
