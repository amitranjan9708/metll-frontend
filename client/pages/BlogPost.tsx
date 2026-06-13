import { useParams, Link, Navigate } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { blogPosts } from "@/data/blog-posts";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  // Schema for Google News / Discover
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.description,
    "image": [post.coverImage],
    "datePublished": post.publishedAt,
    "dateModified": post.publishedAt,
    "author": [{
      "@type": "Person",
      "name": post.author.name,
      "url": "https://metll.in"
    }],
    "publisher": {
      "@type": "Organization",
      "name": "MetLL",
      "logo": {
        "@type": "ImageObject",
        "url": "https://metll.in/og-image.png"
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <SEOHead 
        title={`${post.title} | MetLL Blog`}
        description={post.description}
        canonicalUrl={`https://metll.in/blog/${post.slug}`}
        ogImage={post.coverImage}
        schemaType="Article"
        customSchema={articleSchema}
      />

      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-black/5">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/blog" className="text-sm font-medium text-gray-500 hover:text-black flex items-center gap-1 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
          <button className="p-2 text-gray-500 hover:text-black transition-colors rounded-full hover:bg-gray-100">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12 md:py-20">
        
        {/* Article Header */}
        <header className="mb-12 text-center">
          <div className="inline-block bg-rose-50 text-rose-600 px-3 py-1 rounded-full text-xs font-bold mb-6 tracking-wide uppercase">
            {post.category}
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#311717] mb-8 leading-tight tracking-tight">
            {post.title}
          </h1>
          
          <div className="flex items-center justify-center gap-6 text-sm text-gray-500 font-medium">
            <div className="flex items-center gap-2">
              <img src={post.author.avatar} alt={post.author.name} className="w-8 h-8 rounded-full border border-gray-200" />
              <span className="text-gray-800">{post.author.name}</span>
            </div>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
            <div className="w-1 h-1 bg-gray-300 rounded-full hidden sm:block"></div>
            <div className="flex items-center gap-1.5 hidden sm:flex">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </div>
          </div>
        </header>

        {/* Cover Image */}
        <div className="rounded-3xl overflow-hidden mb-16 shadow-lg border border-black/5">
          <img 
            src={post.coverImage} 
            alt={post.title} 
            className="w-full h-auto aspect-[16/9] object-cover"
          />
        </div>

        {/* Article Content */}
        <article 
          className="prose prose-lg md:prose-xl prose-rose max-w-none text-gray-800"
          dangerouslySetInnerHTML={{ __html: post.content }}
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        />

        {/* CTA Footer */}
        <div className="mt-20 pt-12 border-t border-gray-100 text-center">
          <div className="bg-[#FFF8F8] rounded-3xl p-8 md:p-12 border border-rose-100">
            <h3 className="text-2xl font-black text-[#311717] mb-4">Ready to test the magic yourself?</h3>
            <p className="text-gray-600 mb-8 max-w-lg mx-auto">
              Don't wait for destiny. Drop an anonymous confession today and see if your crush feels the same way.
            </p>
            <Link 
              to="/" 
              className="inline-block bg-black hover:bg-neutral-800 text-white font-bold py-4 px-8 rounded-full transition-transform hover:-translate-y-1 shadow-lg"
            >
              Start Your Confession Now
            </Link>
          </div>
        </div>

      </main>
    </div>
  );
}
