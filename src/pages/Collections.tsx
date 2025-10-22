import { useState, useMemo } from 'react';
import { Filter, Grid, List, Star, Heart, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { Footer } from '@/components/Footer';
import { QuickViewModal } from '@/components/QuickViewModal';
import watchHero from '@/assets/watch-hero.jpg';

// Move static data outside component to prevent recreation on every render
const categories = [
  { id: 'all', name: 'All Collections', count: 24 },
  { id: 'classic', name: 'Classic', count: 8 },
  { id: 'heritage', name: 'Heritage', count: 6 },
  { id: 'limited', name: 'Limited Edition', count: 4 },
  { id: 'bespoke', name: 'Bespoke', count: 6 }
];

const products = [
  {
    id: 1,
    name: "Élégance Noir",
    category: "Classic",
    price: 12500,
    originalPrice: 15000,
    rating: 4.9,
    reviews: 127,
    image: watchHero,
    isNew: true,
    isLimited: false,
    description: "A timeless classic featuring a sleek black dial with gold accents and Swiss automatic movement."
  },
  {
    id: 2,
    name: "Prestige Gold",
    category: "Heritage",
    price: 18900,
    originalPrice: null,
    rating: 4.8,
    reviews: 89,
    image: watchHero,
    isNew: false,
    isLimited: true,
    description: "Heritage collection piece with 18k gold case and hand-engraved complications."
  },
  {
    id: 3,
    name: "Royal Chronograph",
    category: "Limited Edition",
    price: 24000,
    originalPrice: 28000,
    rating: 5.0,
    reviews: 45,
    image: watchHero,
    isNew: false,
    isLimited: true,
    description: "Limited edition chronograph with tourbillon movement and diamond-set bezel."
  },
  {
    id: 4,
    name: "Minimalist Silver",
    category: "Classic",
    price: 8500,
    originalPrice: null,
    rating: 4.7,
    reviews: 203,
    image: watchHero,
    isNew: true,
    isLimited: false,
    description: "Clean, minimalist design with silver case and white dial for everyday elegance."
  },
  {
    id: 5,
    name: "Vintage Rose Gold",
    category: "Heritage",
    price: 16500,
    originalPrice: 19000,
    rating: 4.9,
    reviews: 156,
    image: watchHero,
    isNew: false,
    isLimited: false,
    description: "Vintage-inspired design with rose gold case and cream dial with blue hands."
  },
  {
    id: 6,
    name: "Carbon Fiber Sport",
    category: "Limited Edition",
    price: 32000,
    originalPrice: null,
    rating: 4.8,
    reviews: 67,
    image: watchHero,
    isNew: false,
    isLimited: true,
    description: "High-tech carbon fiber case with titanium movement for the modern collector."
  }
];

export default function Collections() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [sortBy, setSortBy] = useState('featured');
  const [addingToCart, setAddingToCart] = useState<number | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<typeof products[0] | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const { dispatch: cartDispatch } = useCart();

  // Memoize filtered products to prevent recalculation on every render
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      if (selectedCategory !== 'all' && product.category.toLowerCase() !== selectedCategory) {
        return false;
      }
      return product.price >= priceRange[0] && product.price <= priceRange[1];
    });
  }, [selectedCategory, priceRange]);

  const handleAddToCart = async (product: typeof products[0]) => {
    setAddingToCart(product.id);
    
    // Add to cart immediately for better UX
    cartDispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      },
    });
    
    // Brief delay for visual feedback
    setTimeout(() => {
      setAddingToCart(null);
    }, 300);
  };

  const handleQuickView = (product: typeof products[0]) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  const handleCloseQuickView = () => {
    setIsQuickViewOpen(false);
    setQuickViewProduct(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${watchHero})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-luxury-noir/80 via-luxury-noir/60 to-luxury-noir/90" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-serif text-luxury-white mb-6">
            Our <span className="luxury-text-gradient">Collections</span>
          </h1>
          <p className="text-xl text-luxury-cream max-w-2xl mx-auto">
            Discover our curated selection of timepieces, each representing the pinnacle of Swiss craftsmanship.
          </p>
        </div>
      </section>

      {/* Filters and Controls */}
      <section className="py-12 bg-luxury-cream border-b border-luxury-gold/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "luxury" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="text-sm"
                >
                  {category.name} ({category.count})
                </Button>
              ))}
            </div>

            {/* View Controls */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? "luxury" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? "luxury" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-luxury-gold/20 rounded-md bg-luxury-white text-luxury-noir"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-luxury-white">
        <div className="container mx-auto px-4">
          <div className={`grid gap-8 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1 max-w-4xl mx-auto'
          }`}>
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className={`group cursor-pointer ${
                  viewMode === 'list' ? 'flex gap-6' : ''
                }`}
              >
                <div className={`relative overflow-hidden rounded-lg mb-6 bg-luxury-cream shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-luxury)] transition-all duration-500 ${
                  viewMode === 'list' ? 'w-80 h-80 flex-shrink-0' : 'aspect-square'
                }`}>
                  <div className="relative h-full">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-luxury-noir/0 group-hover:bg-luxury-noir/20 transition-all duration-500" />
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {product.isNew && <Badge className="bg-luxury-gold text-luxury-noir">New</Badge>}
                      {product.isLimited && <Badge variant="destructive">Limited</Badge>}
                    </div>

                    {/* Actions */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button size="icon" variant="secondary" className="w-10 h-10">
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="secondary" className="w-10 h-10">
                        <ShoppingBag className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <Button variant="luxury" size="lg">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>

                <div className={viewMode === 'list' ? 'flex-1' : ''}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-luxury-gold font-semibold tracking-wider uppercase">
                      {product.category}
                    </p>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-luxury-gold fill-current" />
                      <span className="text-sm text-luxury-gray">{product.rating}</span>
                      <span className="text-sm text-luxury-gray">({product.reviews})</span>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-serif text-luxury-noir mb-2 group-hover:text-luxury-gold transition-colors duration-300">
                    {product.name}
                  </h3>
                  
                  {viewMode === 'list' && (
                    <p className="text-luxury-gray mb-4 leading-relaxed">
                      {product.description}
                    </p>
                  )}
                  
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-semibold text-luxury-charcoal">
                      ${product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-lg text-luxury-gray line-through">
                        ${product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      variant="luxury" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleAddToCart(product)}
                      disabled={addingToCart === product.id}
                    >
                      {addingToCart === product.id ? 'Adding...' : 'Add to Cart'}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleQuickView(product)}
                    >
                      Quick View
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-16">
            <Button variant="luxury" size="lg">
              Load More Products
            </Button>
          </div>
        </div>
      </section>

      <Footer />

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={isQuickViewOpen}
        onClose={handleCloseQuickView}
      />
    </div>
  );
}

