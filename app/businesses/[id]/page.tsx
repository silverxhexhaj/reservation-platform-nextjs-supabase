import { Footer } from '@/app/components/Footer';

export default function BusinessDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* ... your existing business detail content ... */}
      </main>
      
      <Footer />
    </div>
  );
}