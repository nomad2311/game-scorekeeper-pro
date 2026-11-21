import React, { useState } from 'react';
import { COLOR_THEMES, ColorTheme } from '../theme';
import { Palette, Check, X, Moon, Sun, Sparkles, Wand2, Flame, Skull } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ScorecardLivePreview from './ScorecardLivePreview';

interface ThemeSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentColorTheme: string;
  onSelectColorTheme: (themeId: string) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export function SkullCrestIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" fill="none" className={className} aria-hidden="true">
      {/* Crossed bones behind skull */}
      <path
        d="M5 7L31 29M31 7L5 29"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        opacity="0.45"
      />
      {/* Skull cranium */}
      <path
        d="M18 5C11.925 5 7 9.65 7 15.4C7 18.85 8.75 21.9 11.45 23.75L12.2 28.5C12.35 29.35 13.1 30 14 30H22C22.9 30 23.65 29.35 23.8 28.5L24.55 23.75C27.25 21.9 29 18.85 29 15.4C29 9.65 24.075 5 18 5Z"
        fill="currentColor"
        fillOpacity="0.18"
        stroke="currentColor"
        strokeWidth="2.2"
      />
      {/* Eye sockets */}
      <circle cx="14" cy="16" r="2.6" fill="currentColor" />
      <circle cx="22" cy="16" r="2.6" fill="currentColor" />
      {/* Nasal cavity */}
      <path d="M18 19.2L16.6 22H19.4L18 19.2Z" fill="currentColor" />
      {/* Jaw teeth */}
      <path
        d="M15 26V29.5M18 26V29.5M21 26V29.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DragonCrestIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" fill="none" className={className} aria-hidden="true">
      {/* Dragon horns & wings silhouette */}
      <path
        d="M6 11C9.5 9 13 11 14.5 14L18 7L21.5 14C23 11 26.5 9 30 11C28 15.5 25.5 18 27 23C24 21.5 21.5 23 18 30C14.5 23 12 21.5 9 23C10.5 18 8 15.5 6 11Z"
        fill="currentColor"
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinejoin="round"
      />
      {/* Dragon glowing eyes */}
      <path d="M13.5 17.5L16.5 19L14 20.2Z" fill="currentColor" />
      <path d="M22.5 17.5L19.5 19L22 20.2Z" fill="currentColor" />
      {/* Flame crest */}
      <circle cx="18" cy="13.5" r="1.6" fill="currentColor" />
    </svg>
  );
}

export default function ThemeSelectorModal({
  isOpen,
  onClose,
  currentColorTheme,
  onSelectColorTheme,
  isDarkMode,
  onToggleDarkMode,
}: ThemeSelectorModalProps) {
  const [hoveredThemeId, setHoveredThemeId] = useState<string | null>(null);

  if (!isOpen) return null;

  // Active previewed theme: hovered theme takes precedence over currently selected theme
  const previewThemeId = hoveredThemeId || currentColorTheme;
  const previewTheme =
    COLOR_THEMES.find((t) => t.id === previewThemeId) || COLOR_THEMES[0];
  const isHoveringDifferentTheme =
    Boolean(hoveredThemeId && hoveredThemeId !== currentColorTheme);

  const signatureThemes = COLOR_THEMES.filter((t) => t.category === 'signature');
  const colorPalettes = COLOR_THEMES.filter((t) => t.category !== 'signature');

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 14 }}
          className="bg-white dark:bg-slate-900 rounded-[32px] sm:rounded-[36px] border-2 border-orange-100 dark:border-slate-800 p-5 sm:p-7 max-w-6xl w-full shadow-2xl relative overflow-hidden max-h-[92vh] max-h-[92dvh] overflow-y-auto my-auto flex flex-col"
        >
          {/* MODAL HEADER */}
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-5">
            <div className="flex items-center gap-3">
              <div
                className="p-2.5 rounded-2xl text-white shadow-xs transition-colors duration-300"
                style={{
                  backgroundColor: previewTheme[isDarkMode ? 'dark' : 'light'].btnBg,
                }}
              >
                <Palette className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                    Themes, Skull &amp; Dragon Editions &amp; Color Palettes
                  </h3>
                  {isHoveringDifferentTheme && (
                    <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 border border-amber-300/60 dark:border-amber-700/60 animate-pulse">
                      <Sparkles className="w-3 h-3" /> Hovering: {previewTheme.name}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Choose a Signature Skull or Dragon Edition or pick from 10 tabletop color palettes
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-colors cursor-pointer"
              title="Close theme selector"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* MAIN 2-COLUMN LAYOUT: THEMES ON LEFT, LIVE SCORECARD PREVIEW ON RIGHT */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 flex-1 items-start">
            {/* LEFT COLUMN: Controls & Theme Selection Cards */}
            <div
              className="lg:col-span-7 space-y-5"
              onMouseLeave={() => setHoveredThemeId(null)}
            >
              {/* Day / Night Mode Toggle Bar */}
              <div className="flex items-center justify-between p-3.5 sm:p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700/60">
                <div className="flex items-center gap-3">
                  {isDarkMode ? (
                    <Moon className="w-5 h-5 text-indigo-400 fill-indigo-400/20" />
                  ) : (
                    <Sun className="w-5 h-5 text-amber-500 fill-amber-500/20" />
                  )}
                  <div>
                    <p className="text-xs font-black uppercase text-slate-800 dark:text-slate-200">
                      {isDarkMode ? 'Dark Night Table' : 'Bright Daylight Table'}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                      All {COLOR_THEMES.length} themes support both Daylight &amp; Dark Night modes
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onToggleDarkMode}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 shadow-xs ${
                    isDarkMode
                      ? 'bg-amber-400 text-slate-950 hover:bg-amber-300'
                      : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
              </div>

              {/* SECTION 1: SIGNATURE GRAPHIC THEMES (SKULL & DRAGON) */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-black text-rose-600 dark:text-amber-400 uppercase tracking-wider">
                    <Flame className="w-4 h-4 fill-current" />
                    <span>Signature Graphic Editions (Skull &amp; Dragon)</span>
                  </div>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                    Special Editions
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {signatureThemes.map((theme: ColorTheme) => {
                    const isSelected = currentColorTheme === theme.id;
                    const isHovered = hoveredThemeId === theme.id;
                    const isSkull = theme.id === 'skull';

                    return (
                      <button
                        key={theme.id}
                        type="button"
                        onClick={() => onSelectColorTheme(theme.id)}
                        onMouseEnter={() => setHoveredThemeId(theme.id)}
                        onFocus={() => setHoveredThemeId(theme.id)}
                        onBlur={() => setHoveredThemeId(null)}
                        className={`p-4 rounded-2xl text-left transition-all duration-200 cursor-pointer border-2 relative overflow-hidden flex flex-col justify-between min-h-[142px] group select-none ${
                          isSkull
                            ? isSelected
                              ? 'border-rose-500 bg-gradient-to-br from-zinc-900 via-zinc-900 to-rose-950 text-white shadow-lg ring-2 ring-rose-500/40'
                              : 'border-zinc-700/80 bg-gradient-to-br from-zinc-900/95 via-stone-900 to-zinc-950 text-zinc-100 hover:border-rose-500/70 hover:shadow-md'
                            : isSelected
                            ? 'border-amber-400 bg-gradient-to-br from-red-950 via-red-900 to-amber-950 text-white shadow-lg ring-2 ring-amber-400/40'
                            : 'border-red-800/80 bg-gradient-to-br from-red-950/95 via-stone-900 to-amber-950/90 text-amber-50 hover:border-amber-400/70 hover:shadow-md'
                        }`}
                      >
                        {/* Subtle Background Crest Watermark */}
                        <div className="absolute -right-3 -bottom-3 opacity-15 group-hover:opacity-25 group-hover:scale-110 transition-all pointer-events-none">
                          {isSkull ? (
                            <SkullCrestIcon className="w-24 h-24 text-rose-400" />
                          ) : (
                            <DragonCrestIcon className="w-24 h-24 text-amber-400" />
                          )}
                        </div>

                        <div className="flex justify-between items-start w-full relative z-10">
                          <div className="flex items-start gap-2.5 pr-2">
                            <div
                              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border shadow-sm ${
                                isSkull
                                  ? 'bg-zinc-800 border-rose-500/50 text-rose-400'
                                  : 'bg-red-900/80 border-amber-400/50 text-amber-300'
                              }`}
                            >
                              {isSkull ? (
                                <SkullCrestIcon className="w-6 h-6" />
                              ) : (
                                <DragonCrestIcon className="w-6 h-6" />
                              )}
                            </div>
                            <div className="space-y-0.5 min-w-0">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="font-black text-sm text-white uppercase tracking-tight">
                                  {theme.icon} {theme.name}
                                </span>
                                {isHovered && !isSelected && (
                                  <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded-full bg-white/15 text-white animate-pulse">
                                    Previewing
                                  </span>
                                )}
                              </div>
                              <div
                                className={`text-[10px] font-black uppercase tracking-wider ${
                                  isSkull ? 'text-rose-400' : 'text-amber-300'
                                }`}
                              >
                                {theme.tagline}
                              </div>
                              <p className="text-[11px] text-zinc-300 font-medium leading-snug pt-0.5">
                                {theme.description}
                              </p>
                            </div>
                          </div>

                          {isSelected ? (
                            <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 shadow-sm">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                          ) : (
                            <Skull className="w-4 h-4 opacity-0" />
                          )}
                        </div>

                        <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between w-full relative z-10">
                          <div className="flex items-center gap-1.5">
                            <div
                              className={`h-2.5 w-16 rounded-full bg-gradient-to-r ${theme.previewGradient} shadow-2xs`}
                            />
                            <span className="text-[9px] font-mono text-zinc-300 font-bold uppercase">
                              Signature Theme
                            </span>
                          </div>
                          <span
                            className="w-3 h-3 rounded-full border border-white/60 shadow-2xs"
                            style={{ backgroundColor: theme.primaryColor }}
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SECTION 2: COLOR PALETTES (10 THEMES) */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1.5 text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                    <Wand2 className="w-3.5 h-3.5 text-amber-500" />
                    <span>Tabletop Color Palettes ({colorPalettes.length})</span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium italic">
                    Hover to preview • Click to apply
                  </span>
                </div>

                {/* Color Themes Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[340px] overflow-y-auto pr-1">
                  {colorPalettes.map((theme: ColorTheme) => {
                    const isSelected = currentColorTheme === theme.id;
                    const isHovered = hoveredThemeId === theme.id;

                    return (
                      <button
                        key={theme.id}
                        type="button"
                        onClick={() => onSelectColorTheme(theme.id)}
                        onMouseEnter={() => setHoveredThemeId(theme.id)}
                        onFocus={() => setHoveredThemeId(theme.id)}
                        onBlur={() => setHoveredThemeId(null)}
                        className={`p-3 rounded-2xl text-left transition-all duration-200 cursor-pointer border-2 relative flex flex-col justify-between min-h-[104px] group select-none ${
                          isSelected
                            ? 'border-amber-500 dark:border-amber-400 bg-amber-50/50 dark:bg-amber-950/25 shadow-md ring-2 ring-amber-400/30'
                            : isHovered
                            ? 'border-slate-400 dark:border-slate-600 bg-slate-50/90 dark:bg-slate-800/80 shadow-md scale-[1.01]'
                            : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-xs'
                        }`}
                      >
                        <div className="flex justify-between items-start w-full">
                          <div className="space-y-0.5 min-w-0 pr-2">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              {theme.icon && <span className="text-sm">{theme.icon}</span>}
                              <span className="font-black text-xs sm:text-sm text-slate-900 dark:text-white uppercase tracking-tight truncate">
                                {theme.name}
                              </span>
                              {isHovered && !isSelected && (
                                <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 animate-pulse">
                                  Previewing
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-snug line-clamp-2">
                              {theme.description}
                            </p>
                          </div>

                          {isSelected ? (
                            <div className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 shadow-xs">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                          ) : isHovered ? (
                            <div className="w-5 h-5 rounded-full bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0">
                              <Sparkles className="w-3 h-3" />
                            </div>
                          ) : null}
                        </div>

                        {/* Gradient Swatch Preview Bar */}
                        <div className="mt-2 pt-1.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between w-full">
                          <div className="flex items-center gap-1.5">
                            <div
                              className={`h-2.5 w-14 rounded-full bg-gradient-to-r ${theme.previewGradient} shadow-2xs`}
                            />
                            <span className="text-[9px] font-mono text-slate-400 font-bold uppercase">
                              Palette
                            </span>
                          </div>

                          <span
                            className="w-2.5 h-2.5 rounded-full border border-white/40 shadow-2xs"
                            style={{ backgroundColor: theme.primaryColor }}
                            title={`Primary accent: ${theme.primaryColor}`}
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Done & Apply button */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-3 bg-teal-900 hover:bg-teal-950 text-white font-black text-xs uppercase tracking-widest rounded-2xl transition-colors cursor-pointer shadow-md flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  Done &amp; Apply Theme
                </button>
              </div>
            </div>

            {/* RIGHT COLUMN: Live Scorecard UI Preview */}
            <div className="lg:col-span-5 lg:sticky lg:top-0 space-y-3">
              <div className="hidden lg:flex items-center justify-between px-1">
                <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Live Preview Output
                </span>
                <span className="text-[11px] font-bold text-slate-400">
                  Interactive Scorecard Mock
                </span>
              </div>

              <ScorecardLivePreview
                theme={previewTheme}
                isDarkMode={isDarkMode}
                isHovering={isHoveringDifferentTheme}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
