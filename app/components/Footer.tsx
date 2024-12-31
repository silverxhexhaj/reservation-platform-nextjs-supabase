import Link from 'next/link';

export function Footer() {
  return (
    <footer className="text-gray-600 pb-8 pt-20">
      <div className="px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">About Us</h3>
            <p className="text-sm">
              We connect you with the best beauty and wellness services in your area.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="text-sm space-y-2">
              <li><Link href="/" className="hover:text-gray-900">Home</Link></li>
              <li><Link href="/services" className="hover:text-gray-900">Services</Link></li>
              <li><Link href="/about" className="hover:text-gray-900">About</Link></li>
              <li><Link href="/contact" className="hover:text-gray-900">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Popular Categories</h3>
            <ul className="text-sm space-y-2">
              <li><Link href="/category/hair-salon" className="hover:text-gray-900">Hair Salon</Link></li>
              <li><Link href="/category/nail-salon" className="hover:text-gray-900">Nail Salon</Link></li>
              <li><Link href="/category/spa" className="hover:text-gray-900">Spa</Link></li>
              <li><Link href="/category/barbershop" className="hover:text-gray-900">Barbershop</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Connect With Us</h3>
            <ul className="text-sm space-y-2">
              <li><a href="#" className="hover:text-gray-900">Facebook</a></li>
              <li><a href="#" className="hover:text-gray-900">Twitter</a></li>
              <li><a href="#" className="hover:text-gray-900">Instagram</a></li>
              <li><a href="#" className="hover:text-gray-900">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-sm text-center">
          <p>&copy; 2023 Your Company Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}