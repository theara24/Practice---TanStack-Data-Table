import Image from 'next/image';
import { products } from '@/data/product';
import ProductCard from '@/components/product/ProductCard';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const categories = [
  { name: 'Electronics', icon: '/globe.svg' },
  { name: 'Books', icon: '/window.svg' },
  { name: 'Clothing', icon: '/vercel.svg' },
  { name: 'Home', icon: '/next.svg' },
  { name: 'Sports', icon: '/file.svg' },
];

const testimonials = [
  {
    name: 'Sokha',
    text: 'Amazing service and fast delivery!',
    avatar: '/user1.png',
  },
  {
    name: 'Dara',
    text: 'Great quality products. Will buy again.',
    avatar: '/user2.png',
  },
  {
    name: 'Sophea',
    text: 'Customer support was very helpful!',
    avatar: '/user3.png',
  },
];

export default function Home() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-blue-100 via-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 px-4">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
              Shop the Best Products Online
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Discover top deals, new arrivals, and exclusive offers. Fast
              shipping, easy returns, and 24/7 support.
            </p>
            <Button size="lg" className="px-8 py-4 text-lg">
              Shop Now
            </Button>
          </div>
          <div className="flex-1 flex justify-center">
            <Image
              src="https://bootstrapmade.com/demo/templates/FlexStart/assets/img/hero-img.png"
              alt="Hero"
              width={400}
              height={400}
              className="rounded-xl shadow-lg"
              unoptimized
            />
          </div>
        </div>
      </section>

      <Separator className="my-12" />

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              {...{
                id: product.id,
                title: product.name,
                description: product.description,
                price: product.price,
                thumbnail: product.imageUrl,
                category: product.category,
              }}
            />
          ))}
        </div>
      </section>

      <Separator className="my-12" />

      {/* Shop by Category */}
      <section className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {categories.map((cat) => (
            <Card
              key={cat.name}
              className="items-center text-center py-8 hover:shadow-lg transition"
            >
              <CardHeader className="flex flex-col items-center">
                <Image src={cat.icon} alt={cat.name} width={48} height={48} />
                <CardTitle className="mt-2 text-lg">{cat.name}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <Separator className="my-12" />

      {/* Promotions/Deals */}
      <section className="max-w-7xl mx-auto px-4">
        <Card className="bg-gradient-to-r from-yellow-200 via-yellow-100 to-white flex flex-col md:flex-row items-center justify-between p-8 mb-12">
          <CardContent className="flex-1">
            <CardTitle className="text-2xl mb-2">Limited Time Offer!</CardTitle>
            <CardDescription className="mb-4">
              Get 20% off your first order. Use code{' '}
              <span className="font-bold text-yellow-700">WELCOME20</span> at
              checkout.
            </CardDescription>
            <Button variant="secondary" size="lg">
              Shop Deals
            </Button>
          </CardContent>
          <div className="flex-1 flex justify-center mt-6 md:mt-0">
            <Image src="/vercel.svg" alt="Promotion" width={120} height={120} />
          </div>
        </Card>
      </section>

      <Separator className="my-12" />

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <Card key={t.name} className="items-center text-center py-8">
              <CardHeader className="flex flex-col items-center">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  width={56}
                  height={56}
                  className="rounded-full mb-2"
                />
                <CardTitle className="text-lg">{t.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>&quot;{t.text}&quot;</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator className="my-12" />

      {/* Newsletter Signup */}
      <section className="max-w-7xl mx-auto px-4 mb-16">
        <Card className="flex flex-col md:flex-row items-center justify-between p-8">
          <CardContent className="flex-1">
            <CardTitle className="text-2xl mb-2">Stay Updated!</CardTitle>
            <CardDescription className="mb-4">
              Subscribe to our newsletter for the latest deals and updates.
            </CardDescription>
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="border rounded px-4 py-2 flex-1"
              />
              <Button type="submit" size="lg">
                Subscribe
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-lg font-bold">MyBrand</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white">
              Contact
            </a>
          </div>
          <div className="text-sm">
            &copy; 2024 MyBrand. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
