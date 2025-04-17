import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Package, Star, Facebook, Instagram, Twitter, Search, Filter } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Producer {
  id: string;
  business_name: string;
  description?: string;
  location?: string;
  rating?: number;
  social_media?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  profile_image?: string;
  products: Product[];
}

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  stock: number;
}

const locations = [
  'All Locations',
  'Delhi NCR',
  'Mumbai',
  'Bangalore',
  'Chennai',
  'Kolkata',
];

export function ProducerList() {
  const [producers, setProducers] = useState<Producer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');

  useEffect(() => {
    fetchProducers();
  }, []);

  const fetchProducers = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data: producersData, error: producersError } = await supabase
        .from('profiles')
        .select(`
          *,
          products (*)
        `)
        .eq('type', 'producer')
        .throwOnError();

      if (producersError) throw producersError;

      // Add some mock data for demonstration
      const enhancedData = (producersData || []).map(producer => ({
        ...producer,
        location: producer.location || locations[Math.floor(Math.random() * (locations.length - 1) + 1)],
        rating: producer.rating || (4 + Math.random()).toFixed(1),
        social_media: producer.social_media || {
          facebook: 'https://facebook.com',
          instagram: 'https://instagram.com',
          twitter: 'https://twitter.com'
        }
      }));

      setProducers(enhancedData);
    } catch (err) {
      console.error('Error fetching producers:', err);
      setError('Failed to load producers. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProducers = producers.filter(producer => {
    const matchesSearch = producer.business_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocation === 'All Locations' || producer.location === selectedLocation;
    return matchesSearch && matchesLocation;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Our Producers</h1>
          <p className="mt-2 text-gray-600">Connect with local producers and artisans</p>
        </div>
        
        <div className="mt-4 md:mt-0 flex flex-col md:flex-row gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              placeholder="Search producers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select
            className="block w-full md:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducers.map((producer) => (
          <div key={producer.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
            <div className="relative h-48">
              <img
                src={producer.profile_image || "https://images.unsplash.com/photo-1516594798947-e65505dbb29d?w=800&q=80"}
                alt={producer.business_name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <h2 className="text-xl font-semibold text-white">{producer.business_name}</h2>
                {producer.location && (
                  <p className="flex items-center text-white/90 text-sm mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    {producer.location}
                  </p>
                )}
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Package className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-gray-600">{producer.products?.length || 0} Products</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-current mr-1" />
                  <span className="text-gray-600">{producer.rating}</span>
                </div>
              </div>

              <p className="text-gray-600 mb-4">{producer.description || "A passionate producer creating quality products for our community."}</p>

              <div className="flex space-x-4 mb-4">
                {producer.social_media?.facebook && (
                  <a href={producer.social_media.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 transition-colors">
                    <Facebook className="h-6 w-6" />
                  </a>
                )}
                {producer.social_media?.instagram && (
                  <a href={producer.social_media.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-700 transition-colors">
                    <Instagram className="h-6 w-6" />
                  </a>
                )}
                {producer.social_media?.twitter && (
                  <a href={producer.social_media.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-500 transition-colors">
                    <Twitter className="h-6 w-6" />
                  </a>
                )}
              </div>

              {producer.products && producer.products.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Featured Products</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {producer.products.slice(0, 4).map((product) => (
                      <Link
                        key={product.id}
                        to={`/products/${product.id}`}
                        className="relative group overflow-hidden rounded-lg"
                      >
                        <img
                          src={product.images[0] || "https://images.unsplash.com/photo-1590543367665-c5c60e469adf?w=500&q=80"}
                          alt={product.name}
                          className="w-full h-24 object-cover group-hover:scale-110 transition-transform duration-200"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-end p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <p className="text-white text-sm truncate">{product.name}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <Link
                to={`/producers/${producer.id}`}
                className="mt-4 block w-full text-center py-2 px-4 border border-primary-600 text-primary-600 rounded-md hover:bg-primary-50 transition-colors"
              >
                View Profile
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}