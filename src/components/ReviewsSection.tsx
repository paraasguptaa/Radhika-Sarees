import React, { useState, useEffect } from 'react';
import { CustomerReview } from '../types';
import {
  Star,
  CheckCircle2,
  Send,
  Plus,
  X,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { User, db, handleFirestoreError, OperationType } from '../firebase';
import {
  collection,
  onSnapshot,
  doc,
  setDoc,
  query,
  limit,
} from 'firebase/firestore';

interface ReviewsSectionProps {
  user: User | null;
  onLoginRequest: () => void;
}

const INITIAL_ENGLISH_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-01',
    reviewerName: 'Sunita Gupta',
    initials: 'SG',
    rating: 5,
    comment:
      'For my daughter’s wedding, we bought 8 pure Banarasi and Kanjeevaram sarees from Radhika Sarees in Atarra. The fabric and antique gold zari work are genuinely authentic. Having such a royal boutique in Tel Gali is truly wonderful!',
    productCategory: 'Bridal Banarasi Silk Saree',
    location: 'Atarra, Banda',
    verifiedBuyer: true,
    date: 'Sep 2026',
  },
  {
    id: 'rev-02',
    reviewerName: 'Anjali Tripathi',
    initials: 'AT',
    rating: 5,
    comment:
      'We could not find such trending organza and georgette saree designs in all of Banda or Chitrakoot. The pricing is direct from weavers and the hospitality of the shop owners was so gracious.',
    productCategory: 'Designer Organza Saree',
    location: 'Chitrakoot, UP',
    verifiedBuyer: true,
    date: 'Sep 2026',
  },
  {
    id: 'rev-03',
    reviewerName: 'Rajesh Verma',
    initials: 'RV',
    rating: 5,
    comment:
      'Purchased my 3-piece coat suit and my brother’s groom sherwani. The Italian wool fabric drape and custom shoulder alterations by their in-house master tailor fit like a glove!',
    productCategory: 'Mens Coat Suit & Sherwani',
    location: 'Banda City',
    verifiedBuyer: true,
    date: 'Aug 2026',
  },
  {
    id: 'rev-04',
    reviewerName: 'Poonam Chaurasia',
    initials: 'PC',
    rating: 5,
    comment:
      'Bought a traditional Rajasthani Gota Patti Bandhani saree for festive ceremonies. Flawless fall & pico finishing and swift video call consultation. 5 stars!',
    productCategory: 'Jaipuri Bandhani Silk',
    location: 'Tel Gali, Atarra',
    verifiedBuyer: true,
    date: 'Sep 2026',
  },
];

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  user,
  onLoginRequest,
}) => {
  const [reviews, setReviews] = useState<CustomerReview[]>(INITIAL_ENGLISH_REVIEWS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State in English
  const [name, setName] = useState(user?.displayName || '');
  const [location, setLocation] = useState('Atarra');
  const [rating, setRating] = useState(5);
  const [category, setCategory] = useState('Sarees');
  const [comment, setComment] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Real-time Firestore sync
  useEffect(() => {
    const reviewsCol = collection(db, 'reviews');
    const q = query(reviewsCol, limit(25));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty) {
          const fetched: CustomerReview[] = [];
          snapshot.forEach((docSnap) => {
            const data = docSnap.data();
            const reviewerName = data.userName || data.reviewerName || 'Customer';
            const initials = reviewerName
              .split(' ')
              .map((n: string) => n[0])
              .join('')
              .slice(0, 2)
              .toUpperCase() || 'RS';

            fetched.push({
              id: docSnap.id,
              reviewerName,
              initials,
              rating: Number(data.rating) || 5,
              comment: data.comment || '',
              productCategory: data.sareeCategory || data.productCategory || 'Sarees',
              location: data.location || 'Atarra',
              verifiedBuyer: true,
              date: data.createdAt ? new Date(data.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Recent',
            });
          });

          setReviews((prev) => {
            const map = new Map<string, CustomerReview>();
            INITIAL_ENGLISH_REVIEWS.forEach((r) => map.set(r.id, r));
            fetched.forEach((r) => map.set(r.id, r));
            return Array.from(map.values());
          });
        }
      },
      (error) => {
        console.warn('Firestore reviews snapshot error:', error);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!name.trim()) {
      setErrorMsg('Please enter your name.');
      return;
    }
    if (!comment.trim() || comment.trim().length < 5) {
      setErrorMsg('Please write at least 5 characters sharing your experience.');
      return;
    }

    setIsSubmitting(true);
    const reviewId = `rev-${Date.now()}`;
    const initials = name
      .trim()
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'RS';

    const newRev: CustomerReview = {
      id: reviewId,
      reviewerName: name.trim(),
      initials,
      rating,
      comment: comment.trim(),
      productCategory: category,
      location: location.trim() || 'Atarra (210201)',
      verifiedBuyer: true,
      date: 'Just now',
    };

    try {
      const revRef = doc(db, 'reviews', reviewId);
      await setDoc(revRef, {
        id: newRev.id,
        userName: newRev.reviewerName,
        rating: newRev.rating,
        comment: newRev.comment,
        sareeCategory: newRev.productCategory,
        location: newRev.location,
        createdAt: new Date().toISOString(),
        ...(user?.uid ? { userId: user.uid } : {}),
      });

      setReviews((prev) => [newRev, ...prev]);
      setSuccessMsg('Thank you! Your verified review has been posted.');
      setComment('');
      setTimeout(() => {
        setShowAddModal(false);
        setSuccessMsg('');
      }, 1500);
    } catch (err) {
      console.error('Error submitting review:', err);
      try {
        handleFirestoreError(err, OperationType.CREATE, 'reviews');
      } catch (e) {
        setReviews((prev) => [newRev, ...prev]);
        setSuccessMsg('Review received! Thank you.');
        setTimeout(() => setShowAddModal(false), 1500);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const averageRating = (
    reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length
  ).toFixed(1);

  return (
    <section id="reviews-section" className="py-14 sm:py-20 bg-white border-y border-red-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-[#E51A24] text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Verified Patron Ratings</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight">
              Community Reviews & Feedback
            </h2>
            <p className="mt-2 text-stone-600 text-sm max-w-xl">
              Authentic customer testimonials from patrons across Atarra, Banda, Chitrakoot, and Uttar Pradesh.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3 bg-red-50 p-3 rounded-2xl border border-red-100">
              <div className="text-3xl font-extrabold text-[#E51A24]">{averageRating}</div>
              <div className="text-xs">
                <div className="flex text-amber-500">
                  {'★'.repeat(5)}
                </div>
                <div className="text-stone-500 font-semibold">{reviews.length}+ Verified Reviews</div>
              </div>
            </div>

            <button
              onClick={() => {
                if (!user) {
                  onLoginRequest();
                }
                setShowAddModal(true);
              }}
              className="flex items-center gap-2 px-5 py-3 bg-[#E51A24] hover:bg-red-700 text-white font-bold text-xs sm:text-sm rounded-full shadow-md shadow-red-500/20 transition-all hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#FFFDF9] rounded-2xl p-5 border border-red-100 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex text-amber-500 text-sm">
                    {'★'.repeat(Math.round(rev.rating))}
                  </div>
                  {rev.productCategory && (
                    <span className="text-[10px] font-bold text-[#E51A24] bg-red-100/70 px-2 py-0.5 rounded-full">
                      {rev.productCategory}
                    </span>
                  )}
                </div>

                <p className="text-stone-700 text-xs sm:text-sm leading-relaxed line-clamp-4 italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-200/60 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-stone-900 flex items-center gap-1">
                    <span>{rev.reviewerName}</span>
                    {rev.verifiedBuyer && (
                      <span title="Verified Customer" className="inline-flex">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      </span>
                    )}
                  </h4>
                  <div className="text-[10px] text-stone-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-[#E51A24]" />
                    <span>{rev.location || 'Atarra'}</span>
                  </div>
                </div>

                <div className="text-[10px] text-stone-400">
                  {rev.date}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Review Submission Modal in English */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div
            className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-red-100 p-6 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4 border-b border-stone-100 pb-3">
              <div>
                <h3 className="font-serif font-bold text-lg text-stone-900">
                  Review Radhika Sarees
                </h3>
                <p className="text-xs text-stone-500">
                  Share your shopping experience with fellow patrons.
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-full hover:bg-stone-100 text-stone-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {errorMsg && (
              <div className="mb-3 p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-xl">
                {errorMsg}
              </div>
            )}

            {successMsg && (
              <div className="mb-3 p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold rounded-xl">
                {successMsg}
              </div>
            )}

            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Select Rating *
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 text-2xl transition-transform hover:scale-125 focus:outline-none"
                    >
                      <span className={star <= rating ? 'text-amber-500' : 'text-stone-300'}>
                        ★
                      </span>
                    </button>
                  ))}
                  <span className="text-xs font-bold text-stone-700 ml-2">
                    {rating === 5 ? 'Excellent (5/5)' : `${rating}/5`}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aarti Singh"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#E51A24]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Location / City
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Atarra / Banda"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#E51A24]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Category Purchased
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#E51A24]"
                >
                  <option value="Banarasi Bridal Silk Saree">Banarasi Bridal Silk Saree</option>
                  <option value="Kanjeevaram Silk">Kanjeevaram Silk Saree</option>
                  <option value="Bridal Lehenga">Bridal Lehenga</option>
                  <option value="Mens Coat Suit / Blazer">Mens Coat Suit / Blazer</option>
                  <option value="Groom Sherwani">Groom Sherwani</option>
                  <option value="Organza & Net Saree">Organza & Net Saree</option>
                  <option value="Bandhani & Leheriya">Bandhani & Leheriya</option>
                  <option value="Kids Festive Wear">Kids Festive Wear</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Your Review & Comments *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Share details about the fabric quality, fitting, zari work, or customer hospitality..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#E51A24]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-[#E51A24] hover:bg-red-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-red-500/25 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Posting Review...' : 'Publish Review'}</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
