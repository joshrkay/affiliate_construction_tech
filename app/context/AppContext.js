import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useCallback, } from "react";
const MAX_COMPARE = 4;
const AppContext = createContext(null);
export function AppProvider({ children }) {
    const [compareList, setCompareList] = useState([]);
    const [compareTradeSlug, setCompareTradeSlug] = useState(null);
    const [reviewModalOpen, setReviewModalOpen] = useState(false);
    const [reviewToolId, setReviewToolId] = useState(null);
    const [submitModalOpen, setSubmitModalOpen] = useState(false);
    const [localReviews, setLocalReviews] = useState([]);
    const addToCompare = useCallback((tool) => {
        setCompareList((prev) => {
            if (prev.find((t) => t.id === tool.id))
                return prev;
            if (prev.length >= MAX_COMPARE)
                return prev;
            return [...prev, tool];
        });
    }, []);
    const removeFromCompare = useCallback((toolId) => {
        setCompareList((prev) => prev.filter((t) => t.id !== toolId));
    }, []);
    const clearCompare = useCallback(() => {
        setCompareList([]);
        setCompareTradeSlug(null);
    }, []);
    const isInCompare = useCallback((toolId) => compareList.some((t) => t.id === toolId), [compareList]);
    const openReviewModal = useCallback((toolId) => {
        setReviewToolId(toolId || null);
        setReviewModalOpen(true);
    }, []);
    const closeReviewModal = useCallback(() => {
        setReviewModalOpen(false);
        setReviewToolId(null);
    }, []);
    const openSubmitModal = useCallback(() => setSubmitModalOpen(true), []);
    const closeSubmitModal = useCallback(() => setSubmitModalOpen(false), []);
    const addLocalReview = useCallback((review) => {
        setLocalReviews((prev) => [review, ...prev]);
    }, []);
    return (_jsx(AppContext.Provider, { value: {
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
        }, children: children }));
}
export function useApp() {
    const ctx = useContext(AppContext);
    if (!ctx) {
        // Return safe no-op defaults when rendered outside the provider
        // (e.g., Figma isolated component previews)
        return {
            compareList: [],
            addToCompare: () => { },
            removeFromCompare: () => { },
            clearCompare: () => { },
            isInCompare: () => false,
            compareTradeSlug: null,
            setCompareTradeSlug: () => { },
            reviewModalOpen: false,
            reviewToolId: null,
            openReviewModal: () => { },
            closeReviewModal: () => { },
            submitModalOpen: false,
            openSubmitModal: () => { },
            closeSubmitModal: () => { },
            localReviews: [],
            addLocalReview: () => { },
        };
    }
    return ctx;
}
