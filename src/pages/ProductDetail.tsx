import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { Heart, ShoppingBag, Star, Shield, Truck, RotateCcw, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCart } from '@/contexts/CartContext';
import { Footer } from '@/components/Footer';
import watchHero from '@/assets/watch-hero.jpg';

const Watch3D = () => {
  return (
    <group>
      {/* Watch case */}
      <mesh castShadow>
        <cylinderGeometry args={[1.2, 1.2, 0.3, 64]} />
        <meshStandardMaterial 
          color="#1a1a1a" 
          metalness={0.9} 
          roughness={0.1}
        />
      </mesh>
      
      {/* Watch bezel - gold ring */}
      <mesh position={[0, 0.15, 0]} castShadow>
        <torusGeometry args={[1.2, 0.1, 16, 64]} />
        <meshStandardMaterial 
          color="#d4af37" 
          metalness={1} 
          roughness={0.2}
          emissive="#d4af37"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Watch face */}
      <mesh position={[0, 0.16, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.1, 64]} />
        <meshStandardMaterial 
          color="#0a0a0a" 
          metalness={0.8} 
          roughness={0.3}
        />
      </mesh>
      
      {/* Hour markers (gold) */}
      {[...Array(12)].map((_, i) => {
        const angle = (i * Math.PI) / 6;
        const radius = 0.9;
        return (
          <mesh
            key={i}
            position={[
              Math.sin(angle) * radius,
              0.17,
              Math.cos(angle) * radius,
            ]}
          >
            <boxGeometry args={[0.05, 0.01, 0.15]} />
            <meshStandardMaterial 
              color="#d4af37" 
              metalness={1} 
              roughness={0.1}
              emissive="#d4af37"
              emissiveIntensity={0.3}
            />
          </mesh>
        );
      })}
      
      {/* Hour hand */}
      <mesh position={[0, 0.18, -0.3]} rotation={[0, 0, Math.PI / 6]}>
        <boxGeometry args={[0.08, 0.02, 0.5]} />
        <meshStandardMaterial 
          color="#d4af37" 
          metalness={1} 
          roughness={0.1}
        />
      </mesh>
      
      {/* Minute hand */}
      <mesh position={[0, 0.19, -0.5]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.06, 0.02, 0.7]} />
        <meshStandardMaterial 
          color="#d4af37" 
          metalness={1} 
          roughness={0.1}
        />
      </mesh>
      
      {/* Center crown */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.02, 32]} />
        <meshStandardMaterial 
          color="#d4af37" 
          metalness={1} 
          roughness={0.1}
        />
      </mesh>
    </group>
  );
};

export default function ProductDetail() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('42mm');
  const [selectedStrap, setSelectedStrap] = useState('leather');
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const { dispatch: cartDispatch } = useCart();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Mock product data - in real app, fetch by id
  const product = {
    id: 1,
    name: "Élégance Noir",
    category: "Classic Collection",
    price: 12500,
    originalPrice: 15000,
    rating: 4.9,
    reviews: 127,
    images: [watchHero, watchHero, watchHero, watchHero],
    isNew: true,
    isLimited: false,
    description: "A timeless classic featuring a sleek black dial with gold accents and Swiss automatic movement. This exceptional timepiece represents the perfect balance of traditional craftsmanship and modern elegance.",
    features: [
      "Swiss Automatic Movement",
      "42mm Stainless Steel Case",
      "Sapphire Crystal Glass",
      "Water Resistant to 50m",
      "2-Year International Warranty"
    ],
    specifications: {
      "Movement": "Swiss Automatic Caliber L-123",
      "Case Material": "Stainless Steel",
      "Case Size": "42mm",
      "Crystal": "Sapphire Crystal",
      "Water Resistance": "50 meters",
      "Power Reserve": "42 hours",
      "Strap": "Genuine Leather",
      "Clasp": "Deployant Buckle"
    },
    sizes: ['38mm', '40mm', '42mm', '44mm'],
    straps: [
      { id: 'leather', name: 'Black Leather', price: 0 },
      { id: 'steel', name: 'Stainless Steel', price: 500 },
      { id: 'gold', name: '18k Gold', price: 2000 }
    ]
  };

  const relatedProducts = [
    { id: 2, name: "Prestige Gold", price: 18900, image: watchHero },
    { id: 3, name: "Royal Chronograph", price: 24000, image: watchHero },
    { id: 4, name: "Minimalist Silver", price: 8500, image: watchHero }
  ];

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    
    // Simulate adding to cart
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const selectedStrapData = product.straps.find(s => s.id === selectedStrap);
    
    cartDispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        quantity,
        size: selectedSize,
        strap: selectedStrapData?.name,
        customization: {
          size: selectedSize,
          strap: selectedStrapData?.name || '',
          strapPrice: selectedStrapData?.price || 0,
        },
      },
    });
    
    setIsAddingToCart(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square relative overflow-hidden rounded-lg bg-luxury-cream shadow-[var(--shadow-soft)]">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.isNew && (
                <Badge className="absolute top-4 left-4 bg-luxury-gold text-luxury-noir">
                  New
                </Badge>
              )}
              {product.isLimited && (
                <Badge variant="destructive" className="absolute top-4 right-4">
                  Limited
                </Badge>
              )}
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                    selectedImage === index 
                      ? 'border-luxury-gold' 
                      : 'border-luxury-gold/20 hover:border-luxury-gold/50'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* 3D View */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-luxury-noir mb-4">3D Interactive View</h3>
              <div className="h-64 rounded-lg overflow-hidden bg-luxury-charcoal">
              <Canvas 
                shadows
                onCreated={({ gl }) => {
                  gl.domElement.addEventListener('webglcontextlost', (event) => {
                    event.preventDefault();
                    console.warn('WebGL context lost, attempting to restore...');
                  });
                  gl.domElement.addEventListener('webglcontextrestored', () => {
                    console.log('WebGL context restored');
                  });
                }}
              >
                <PerspectiveCamera makeDefault position={[0, 2, 5]} />
                <OrbitControls 
                  enablePan={false} 
                  minDistance={3} 
                  maxDistance={8}
                  autoRotate
                  autoRotateSpeed={0.5}
                  enableDamping={true}
                  dampingFactor={0.05}
                />
                  
                  <ambientLight intensity={0.3} />
                  <spotLight
                    position={[5, 5, 5]}
                    angle={0.3}
                    penumbra={1}
                    intensity={2}
                    castShadow
                  />
                  <pointLight position={[0, 3, 0]} intensity={0.5} color="#d4af37" />
                  
                  <Watch3D />
                  <Environment preset="studio" />
                </Canvas>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-luxury-gold font-semibold tracking-wider uppercase text-sm mb-2">
                {product.category}
              </p>
              <h1 className="text-4xl font-serif text-luxury-noir mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-luxury-gold fill-current" />
                  <span className="text-lg font-semibold">{product.rating}</span>
                  <span className="text-luxury-gray">({product.reviews} reviews)</span>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-luxury-charcoal">
                  ${product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-luxury-gray line-through">
                    ${product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              <p className="text-luxury-gray leading-relaxed mb-6">
                {product.description}
              </p>
            </div>

            {/* Customization Options */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-luxury-noir mb-2">
                  Case Size
                </label>
                <div className="flex gap-2">
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "luxury" : "outline"}
                      size="sm"
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-luxury-noir mb-2">
                  Strap Material
                </label>
                <div className="space-y-2">
                  {product.straps.map((strap) => (
                    <div
                      key={strap.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedStrap === strap.id
                          ? 'border-luxury-gold bg-luxury-gold/5'
                          : 'border-luxury-gold/20 hover:border-luxury-gold/50'
                      }`}
                      onClick={() => setSelectedStrap(strap.id)}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{strap.name}</span>
                        {strap.price > 0 && (
                          <span className="text-luxury-gold">+${strap.price.toLocaleString()}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-luxury-noir mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <Button 
                variant="luxury" 
                size="lg" 
                className="flex-1"
                onClick={handleAddToCart}
                disabled={isAddingToCart}
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                {isAddingToCart ? 'Adding...' : 'Add to Cart'}
              </Button>
              <Button variant="outline" size="lg">
                <Heart className="w-5 h-5" />
              </Button>
            </div>

            {/* Features */}
            <div className="pt-6 border-t border-luxury-gold/20">
              <h3 className="text-lg font-semibold text-luxury-noir mb-4">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-luxury-gray">
                    <div className="w-2 h-2 rounded-full bg-luxury-gold" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Shipping Info */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-luxury-gold/20">
              <div className="text-center">
                <Truck className="w-6 h-6 text-luxury-gold mx-auto mb-2" />
                <p className="text-sm font-semibold">Free Shipping</p>
                <p className="text-xs text-luxury-gray">Worldwide</p>
              </div>
              <div className="text-center">
                <Shield className="w-6 h-6 text-luxury-gold mx-auto mb-2" />
                <p className="text-sm font-semibold">2-Year Warranty</p>
                <p className="text-xs text-luxury-gray">International</p>
              </div>
              <div className="text-center">
                <RotateCcw className="w-6 h-6 text-luxury-gold mx-auto mb-2" />
                <p className="text-sm font-semibold">30-Day Returns</p>
                <p className="text-xs text-luxury-gray">No Questions</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="specifications" className="mb-20">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="warranty">Warranty</TabsTrigger>
          </TabsList>
          
          <TabsContent value="specifications" className="mt-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-serif text-luxury-noir mb-6">Technical Specifications</h3>
                <div className="space-y-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-luxury-gold/10">
                      <span className="font-semibold text-luxury-noir">{key}</span>
                      <span className="text-luxury-gray">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-serif text-luxury-noir mb-6">Movement Details</h3>
                <p className="text-luxury-gray leading-relaxed">
                  The Swiss Automatic Caliber L-123 movement represents over 150 years of horological expertise. 
                  Each movement is hand-assembled by master watchmakers and tested for precision and reliability.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="features" className="mt-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-serif text-luxury-noir mb-6">Advanced Features</h3>
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-luxury-gold mt-2 flex-shrink-0" />
                      <span className="text-luxury-gray">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-serif text-luxury-noir mb-6">Craftsmanship</h3>
                <p className="text-luxury-gray leading-relaxed">
                  Every component is meticulously crafted using traditional techniques passed down through generations. 
                  The case is polished to a mirror finish, while the dial features hand-applied indices and a 
                  sunburst pattern that catches light beautifully.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="warranty" className="mt-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-serif text-luxury-noir mb-6">Warranty Coverage</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-luxury-gold mt-2 flex-shrink-0" />
                    <span className="text-luxury-gray">2-year international warranty</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-luxury-gold mt-2 flex-shrink-0" />
                    <span className="text-luxury-gray">Free maintenance service</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-luxury-gold mt-2 flex-shrink-0" />
                    <span className="text-luxury-gray">Authenticity guarantee</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-serif text-luxury-noir mb-6">Service Network</h3>
                <p className="text-luxury-gray leading-relaxed">
                  Our authorized service centers are located in major cities worldwide. Each service center 
                  is staffed by certified technicians trained in Lumière timepiece maintenance and repair.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        <section>
          <h2 className="text-3xl font-serif text-luxury-noir mb-8 text-center">
            You Might Also Like
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {relatedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-lg mb-4 bg-luxury-cream shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-luxury)] transition-all duration-500">
                  <div className="aspect-square relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-luxury-noir/0 group-hover:bg-luxury-noir/20 transition-all duration-500" />
                  </div>
                </div>
                <h3 className="text-xl font-serif text-luxury-noir mb-2 group-hover:text-luxury-gold transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="text-lg font-semibold text-luxury-charcoal">
                  ${product.price.toLocaleString()}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
