import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ShoppingBag, Star, Shield, Truck, RotateCcw, Plus, Minus, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useCart } from '@/contexts/CartContext';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  isNew: boolean;
  isLimited: boolean;
  description: string;
}

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const QuickViewModal = ({ product, isOpen, onClose }: QuickViewModalProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('42mm');
  const [selectedStrap, setSelectedStrap] = useState('leather');
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const { dispatch: cartDispatch } = useCart();

  if (!product) return null;

  // Mock product images - in real app, this would come from the product data
  const productImages = [
    product.image,
    product.image, // Using same image for demo
    product.image,
  ];

  const sizes = ['38mm', '40mm', '42mm', '44mm'];
  const straps = [
    { id: 'leather', name: 'Genuine Leather', price: 0 },
    { id: 'steel', name: 'Stainless Steel', price: 500 },
    { id: 'gold', name: '18k Gold', price: 2000 },
  ];

  const handleAddToCart = async () => {
    setIsAddingToCart(true);

    // Simulate adding to cart
    await new Promise(resolve => setTimeout(resolve, 500));

    const selectedStrapData = straps.find(s => s.id === selectedStrap);

    cartDispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
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
    onClose();
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto p-0">
        <div className="grid lg:grid-cols-2 gap-0">
          {/* Product Images */}
          <div className="relative bg-luxury-cream">
            <div className="relative h-96 lg:h-full min-h-[400px]">
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              
              {/* Image Navigation */}
              {productImages.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-luxury-white/80 hover:bg-luxury-white"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-luxury-white/80 hover:bg-luxury-white"
                    onClick={nextImage}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </>
              )}

              {/* Image Thumbnails */}
              {productImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {productImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-12 h-12 rounded border-2 overflow-hidden ${
                        selectedImage === index 
                          ? 'border-luxury-gold' 
                          : 'border-luxury-gray/50'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && <Badge className="bg-luxury-gold text-luxury-noir">New</Badge>}
                {product.isLimited && <Badge variant="destructive">Limited</Badge>}
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="p-8 bg-luxury-white">
            <div className="mb-6">
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
              
              <h2 className="text-3xl font-serif text-luxury-noir mb-4">
                {product.name}
              </h2>
              
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl font-semibold text-luxury-charcoal">
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

            {/* Size Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-luxury-noir mb-3">Size</h3>
              <div className="flex gap-2">
                {sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "luxury" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSize(size)}
                    className="text-sm"
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Strap Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-luxury-noir mb-3">Strap</h3>
              <div className="space-y-2">
                {straps.map((strap) => (
                  <Button
                    key={strap.id}
                    variant={selectedStrap === strap.id ? "luxury" : "outline"}
                    size="sm"
                    onClick={() => setSelectedStrap(strap.id)}
                    className="w-full justify-between"
                  >
                    <span>{strap.name}</span>
                    {strap.price > 0 && (
                      <span className="text-sm">+${strap.price}</span>
                    )}
                  </Button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-luxury-noir mb-3">Quantity</h3>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="text-lg font-semibold w-8 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-luxury-noir mb-3">Features</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-sm text-luxury-gray">
                  <Shield className="w-4 h-4" />
                  <span>2 Year Warranty</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-luxury-gray">
                  <Truck className="w-4 h-4" />
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-luxury-gray">
                  <RotateCcw className="w-4 h-4" />
                  <span>30 Day Returns</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-luxury-gray">
                  <Star className="w-4 h-4" />
                  <span>Premium Quality</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
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

            {/* Additional Info */}
            <div className="mt-6 pt-6 border-t border-luxury-gold/20">
              <div className="flex items-center justify-between text-sm text-luxury-gray">
                <span>SKU: LUM-{product.id.toString().padStart(3, '0')}</span>
                <span>In Stock</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
