import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { Tool, Review } from "../data/constructionData";

const MAX_COMPARE = 4;

interface AppContextType {
  // Compare
  compareList: Tool[];
  addToCompare: (tool: Tool) => void;
  removeFromCompare: (toolId: string) => void;
  clearCompare: () => void;
  isInCompare: (toolId: string) => boolean;
  compareTradeSlug: string | null;
  setCompareTradeSlug: (slug: string | null) => void;

  // Review Modal
  reviewModalOpen: boolean;
  reviewToolId: string | null;
  openReviewModal: (toolId?: string) => void;
  closeReviewModal: () => void;

  // Submit Tool Modal
  submitModalOpen: boolean;
  openSubmitModal: () => void;
  closeSubmitModal: () => void;

  // Local reviews (user-submitted)
  localReviews: Review[];
  addLocalReview: (review: Review) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [compareList, setCompareList] = useState<Tool[]>([]);
  const [compareTradeSlug, setCompareTradeSlug] = useState<string | null>(null);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewToolId, setReviewToolId] = useState<string | null>(null);
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [localReviews, setLocalReviews] = useState<Review[]>([]);

  const addToCompare = useCallback((tool: Tool) => {
    setCompareList((prev) => {
      if (prev.find((t) => t.id === tool.id)) return prev;
      if (prev.length >= MAX_COMPARE) return prev;
      return [...prev, tool];
    });
  }, []);

  const removeFromCompare = useCallback((toolId: string) => {
    setCompareList((prev) => prev.filter((t) => t.id !== toolId));
  }, []);

  const clearCompare = useCallback(() => {
    setCompareList([]);
    setCompareTradeSlug(null);
  }, []);

  const isInCompare = useCallback(
    (toolId: string) => compareList.some((t) => t.id === toolId),
    [compareList]
  );

  const openReviewModal = useCallback((toolId?: string) => {
    setReviewToolId(toolId || null);
    setReviewModalOpen(true);
  }, []);

  const closeReviewModal = useCallback(() => {
    setReviewModalOpen(false);
    setReviewToolId(null);
  }, []);

  const openSubmitModal = useCallback(() => setSubmitModalOpen(true), []);
  const closeSubmitModal = useCallback(() => setSubmitModalOpen(false), []);

  const addLocalReview = useCallback((review: Review) => {
    setLocalReviews((prev) => [review, ...prev]);
  }, []);

  return (
    <AppContext.Provider
      value={{
        compareList,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
        compareTradeSlug,
        setCompareTradeSlug,
        reviewModalOpen,
        reviewToolId,
        openReviewModal,
        closeReviewModal,
        submitModalOpen,
        openSubmitModal,
        closeSubmitModal,
        localReviews,
        addLocalReview,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    // Return safe no-op defaults when rendered outside the provider
    // (e.g., Figma isolated component previews)
    return {
      compareList: [],
      addToCompare: () => {},
      removeFromCompare: () => {},
      clearCompare: () => {},
      isInCompare: () => false,
      compareTradeSlug: null,
      setCompareTradeSlug: () => {},
      reviewModalOpen: false,
      reviewToolId: null,
      openReviewModal: () => {},
      closeReviewModal: () => {},
      submitModalOpen: false,
      openSubmitModal: () => {},
      closeSubmitModal: () => {},
      localReviews: [],
      addLocalReview: () => {},
    } as AppContextType;
  }
  return ctx;
}