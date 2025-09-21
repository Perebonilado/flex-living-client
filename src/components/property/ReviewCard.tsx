"use client";

import React, { FC, useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote, Star, Sparkles, Heart, ThumbsUp } from "lucide-react";

interface ReviewCardProps {
  name: string;
  review: string;
  rating?: number;
}

const ReviewCard: FC<ReviewCardProps> = ({ name, review, rating = 5 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [sparkles, setSparkles] = useState<
    Array<{ id: number; x: number; y: number; delay: number }>
  >([]);

  useEffect(() => {
    if (isHovered) {
      const newSparkles = Array.from({ length: 6 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 0.5,
      }));
      setSparkles(newSparkles);
    }
  }, [isHovered]);

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 transition-all duration-300 ${
          i < rating
            ? "text-yellow-400 fill-yellow-400 drop-shadow-sm"
            : "text-gray-300"
        } ${isHovered ? "animate-pulse" : ""}`}
        style={{
          animationDelay: `${i * 0.1}s`,
        }}
      />
    ));
  };

  return (
    <div className="group perspective-1000 transform-gpu">
      <Card
        className={`relative w-full overflow-hidden
          bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20
          border-0 shadow-2xl hover:shadow-3xl
          transition-all duration-700 ease-out transform-gpu
          hover:scale-105 hover:-rotate-1
          before:absolute before:inset-0 before:bg-gradient-to-r 
          before:from-blue-600/0 before:via-purple-600/0 before:to-pink-600/0
          hover:before:from-blue-600/5 hover:before:via-purple-600/5 hover:before:to-pink-600/5
          before:transition-all before:duration-700
          backdrop-blur-sm border-white/20
          ${isHovered ? "shadow-blue-500/25" : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          background: isHovered
            ? "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(240,248,255,0.8) 50%, rgba(250,245,255,0.8) 100%)"
            : undefined,
        }}
      >
        {sparkles.map((sparkle) => (
          <Sparkles
            key={sparkle.id}
            className={`absolute h-3 w-3 text-yellow-400 pointer-events-none
              ${isHovered ? "animate-ping" : "opacity-0"}
              transition-opacity duration-300`}
            style={{
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
              animationDelay: `${sparkle.delay}s`,
              animationDuration: "2s",
            }}
          />
        ))}

        <div
          className={`absolute inset-0 rounded-2xl transition-all duration-700
          ${isHovered ? "shadow-[0_0_30px_rgba(59,130,246,0.3)]" : ""}
          pointer-events-none`}
        />

        <CardHeader className="relative pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar
                  className={`h-14 w-14 ring-4 ring-white shadow-xl transition-all duration-500
                  ${
                    isHovered
                      ? "ring-blue-200 shadow-blue-200/50 scale-110"
                      : ""
                  }`}
                >
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-lg">
                    {name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle
                  className={`text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 
                  bg-clip-text text-transparent transition-all duration-300
                  ${isHovered ? "from-blue-700 to-purple-700" : ""}`}
                >
                  {name}
                </CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1">{renderStars()}</div>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="relative pt-0">
          <div className="relative">
            <Quote
              className={`absolute -top-2 -left-1 h-8 w-8 transition-all duration-500
              ${
                isHovered
                  ? "text-blue-400 scale-110 rotate-12"
                  : "text-gray-300"
              }`}
            />
            <blockquote
              className={`text-gray-700 leading-relaxed font-medium pl-6 transition-all duration-300
              ${isHovered ? "text-gray-800" : ""}`}
              style={{
                fontFamily: '"Inter", system-ui, sans-serif',
                lineHeight: 1.7,
              }}
            >
              "{review}"
            </blockquote>
          </div>
        </CardContent>
        <div
          className={`absolute inset-0 bg-gradient-to-t from-white/0 via-white/0 to-white/10 
          pointer-events-none rounded-2xl transition-opacity duration-700
          ${isHovered ? "opacity-100" : "opacity-0"}`}
        />
      </Card>
    </div>
  );
};

export default ReviewCard;
