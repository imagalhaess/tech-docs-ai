"use client";

import { useState } from "react";
import { Search } from "lucide-react";

interface SearchFormProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export default function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Digite o nome da tecnologia (ex: React, Node.js, Python...)"
          className="w-full px-4 py-3 pr-12 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          disabled={isLoading}
          aria-label="Campo de busca de tecnologias"
          aria-describedby="search-help"
        />
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-primary-600 hover:text-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Buscar tecnologia"
        >
          <Search className="w-6 h-6" />
        </button>
      </div>

      {isLoading && (
        <div className="mt-4 text-center" role="status" aria-live="polite">
          <div className="inline-flex items-center space-x-2 text-primary-600">
            <div
              className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600"
              aria-hidden="true"
            ></div>
            <span>Buscando documentação...</span>
          </div>
        </div>
      )}
    </form>
  );
}
