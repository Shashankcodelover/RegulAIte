"use client";
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { AnalysisData } from "./mockData";

type User = {
  name: string;
  hash: string;
  plan: "free" | "pro" | "demo";
};

type AnalysisContextType = {
  user: User | null;
  setUser: (u: User | null) => void;
  analysisData: AnalysisData | null;
  setAnalysisData: (d: AnalysisData | null) => void;
  isAnalysing: boolean;
  setIsAnalysing: (v: boolean) => void;
  demoMode: boolean;
  setDemoMode: (v: boolean) => void;
  uploadedFileName: string | null;
  setUploadedFileName: (n: string | null) => void;
  clearSession: () => void;
};

const AnalysisContext = createContext<AnalysisContextType | null>(null);

const STORAGE_KEY = "regulaite_session_v2";

export function AnalysisProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  const [analysisData, setAnalysisDataState] = useState<AnalysisData | null>(null);
  const [isAnalysing, setIsAnalysing] = useState(false);
  const [demoMode, setDemoModeState] = useState(false);
  const [uploadedFileName, setUploadedFileNameState] = useState<string | null>(null);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setTimeout(() => {
          if (parsed.user) setUserState(parsed.user);
          if (parsed.analysisData) setAnalysisDataState(parsed.analysisData);
          if (parsed.demoMode) setDemoModeState(parsed.demoMode);
          if (parsed.uploadedFileName) setUploadedFileNameState(parsed.uploadedFileName);
        }, 0);
      }
    } catch {
      // ignore corrupt storage
    }
  }, []);

  // Persist to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ user, analysisData, demoMode, uploadedFileName })
      );
    } catch {
      // ignore storage quota
    }
  }, [user, analysisData, demoMode, uploadedFileName]);

  const setUser = useCallback((u: User | null) => setUserState(u), []);
  const setAnalysisData = useCallback((d: AnalysisData | null) => setAnalysisDataState(d), []);
  const setDemoMode = useCallback((v: boolean) => setDemoModeState(v), []);
  const setUploadedFileName = useCallback((n: string | null) => setUploadedFileNameState(n), []);

  const clearSession = useCallback(() => {
    setUserState(null);
    setAnalysisDataState(null);
    setDemoModeState(false);
    setUploadedFileNameState(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <AnalysisContext.Provider
      value={{
        user,
        setUser,
        analysisData,
        setAnalysisData,
        isAnalysing,
        setIsAnalysing,
        demoMode,
        setDemoMode,
        uploadedFileName,
        setUploadedFileName,
        clearSession,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysis(): AnalysisContextType {
  const ctx = useContext(AnalysisContext);
  if (!ctx) throw new Error("useAnalysis must be used within AnalysisProvider");
  return ctx;
}
