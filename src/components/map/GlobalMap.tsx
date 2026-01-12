"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import locationsData from "@/data/locations.json";
import type { Location } from "@/types";
import { FADE_IN_UP, FADE_IN } from "@/types";

// ============================================
// CONSTANTS
// ============================================

const MAP_CONFIG = {
    center: [50, 15] as [number, number],
    zoom: 1.2,
    tileUrl: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
} as const;

// ============================================
// MEMORY MODAL COMPONENT
// ============================================

const MemoryModal = ({
    location,
    onClose,
}: {
    location: Location;
    onClose: () => void;
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const memories = location.memories || [];

    const goNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % memories.length);
    }, [memories.length]);

    const goPrev = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + memories.length) % memories.length);
    }, [memories.length]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight") goNext();
            if (e.key === "ArrowLeft") goPrev();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose, goNext, goPrev]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "unset";
        };
    }, []);

    if (memories.length === 0) return null;

    const currentMemory = memories[currentIndex];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

            {/* Modal Content */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="relative w-full max-w-4xl mx-4 md:mx-8"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute -top-12 right-0 p-2 text-white/70 hover:text-white transition-colors z-10"
                >
                    <X size={24} />
                </button>

                {/* Header */}
                <div className="text-center mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">
                        {location.name}
                    </h2>
                    <p className="text-white/60 text-sm">
                        {location.country} • {location.description}
                    </p>
                </div>

                {/* Image Slideshow */}
                <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-gray-900">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={currentIndex}
                            src={currentMemory.image}
                            alt={currentMemory.caption} 
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.3 }}
                            className="w-full h-full object-cover"
                        />
                    </AnimatePresence>

                    {/* Caption Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
                        <motion.p
                            key={currentIndex}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-white text-lg font-medium"
                        >
                            {currentMemory.caption}
                        </motion.p>
                        <p className="text-white/60 text-sm mt-1">{currentMemory.year}</p>
                    </div>

                    {/* Navigation Arrows */}
                    {memories.length > 1 && (
                        <>
                            <button
                                onClick={goPrev}
                                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all"
                            >
                                <ChevronLeft size={24} className="text-white" />
                            </button>
                            <button
                                onClick={goNext}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all"
                            >
                                <ChevronRight size={24} className="text-white" />
                            </button>
                        </>
                    )}
                </div>

                {/* Dots Indicator */}
                {memories.length > 1 && (
                    <div className="flex justify-center gap-2 mt-4">
                        {memories.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-2 h-2 rounded-full transition-all ${
                                    index === currentIndex
                                        ? "bg-white w-6"
                                        : "bg-white/40 hover:bg-white/60"
                                }`}
                            />
                        ))}
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
};

// ============================================
// LEAFLET MAP COMPONENT
// ============================================

const LeafletMap = ({
    locations,
    onMarkerClick,
}: {
    locations: Location[];
    onMarkerClick: (location: Location) => void;
}) => {
    const [mapReady, setMapReady] = useState(false);
    const [leafletModules, setLeafletModules] = useState<any>(null);
    const didFitBoundsRef = useRef(false);

    useEffect(() => {
        const loadLeaflet = async () => {
            const [reactLeaflet, L] = await Promise.all([
                import("react-leaflet"),
                import("leaflet"),
            ]);
            setLeafletModules({ ...reactLeaflet, L });
            setMapReady(true);
        };
        loadLeaflet();
    }, []);

    if (!mapReady || !leafletModules) {
        return (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <div className="text-gray-400 text-sm">Loading map...</div>
            </div>
        );
    }

    const { MapContainer, TileLayer, Marker, useMap, useMapEvents } = leafletModules;
    const L = leafletModules.L;

    // Create custom DivIcon for each location
    const createPinIcon = (name: string) => {
        return L.divIcon({
            className: "custom-pin-marker",
            html: `
                <div style="
                    position: relative;
                    display: inline-block;
                    cursor: pointer;
                    border-radius: 11px;
                    box-sizing: border-box;
                    padding-bottom: 6px;
                ">
                    <div style="
                        padding: 6px 10px;
                        background: black;
                        color: #e5e7eb;
                        font-size: 11px;
                        font-weight: 500;
                        font-family: system-ui, -apple-system, sans-serif;
                        box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
                        white-space: nowrap;
                        border-radius: 2px;
                    ">${name}</div>
                </div>
            `,
            iconSize: [0, 0],
            iconAnchor: [0, 0], // Will be adjusted by CSS
        });
    };

    const FitBoundsOnLoad = () => {
        const map = useMap();
        
        useEffect(() => {
            if (!didFitBoundsRef.current && locations.length > 0) {
                // coordinates are [lng, lat] in JSON, Leaflet needs [lat, lng]
                const bounds = locations.map((loc) => [
                    loc.coordinates[1], // lat
                    loc.coordinates[0], // lng
                ] as [number, number]);
                
                map.fitBounds(bounds, { padding: [1, 1] });
                didFitBoundsRef.current = true;
            }
        }, [map]);

        return null;
    };

    return (
        <MapContainer
            center={MAP_CONFIG.center}
            zoom={MAP_CONFIG.zoom}
            style={{ width: "100%", height: "100%" }}
            zoomControl={false}
            attributionControl={false}
            scrollWheelZoom={false}
        >
            <TileLayer url={MAP_CONFIG.tileUrl} />
            <FitBoundsOnLoad />
            
            {locations.map((location) => {
                // coordinates are [lng, lat] in JSON, Leaflet needs [lat, lng]
                const lat = location.coordinates[1];
                const lng = location.coordinates[0];
                
                return (
                    <Marker
                        key={location.id}
                        position={[lat, lng]}
                        icon={createPinIcon(location.name)}
                        eventHandlers={{
                            click: () => onMarkerClick(location),
                        }}
                    />
                );
            })}
        </MapContainer>
    );
};

// ============================================
// MAIN COMPONENT
// ============================================

export const GlobalMap = () => {
    const locations = locationsData as Location[];
    const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

    const handleMarkerClick = useCallback((location: Location) => {
        setSelectedLocation(location);
    }, []);

    const handleCloseModal = useCallback(() => {
        setSelectedLocation(null);
    }, []);

    return (
        <section className="py-24 bg-white relative">
            <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <motion.div
                        {...FADE_IN_UP}
                        className="mb-12"
                    >
                        <h2 className="text-2xl font-bold mb-2">Professional Experiences</h2>
                        <p className="text-gray-600 text-sm">
                            Click on a location to explore my memories and experiences.
                        </p>
                    </motion.div>

                    {/* Map */}
                    <motion.div
                        {...FADE_IN}
                        transition={{ delay: 0.2 }}
                        className="relative aspect-[16/10] md:aspect-[21/9] overflow-hidden rounded-sm bg-gray-100"
                    >
                        <LeafletMap
                            locations={locations}
                            onMarkerClick={handleMarkerClick}
                        />
                    </motion.div>
                </div>
            </div>

            {/* Memory Modal */}
            <AnimatePresence>
                {selectedLocation && (
                    <MemoryModal
                        location={selectedLocation}
                        onClose={handleCloseModal}
                    />
                )}
            </AnimatePresence>
        </section>
    );
};
