import { Profile } from "@prisma/client";
import type { ZodIssue } from "zod";

export interface CreateAPIData {
  error: string | ZodIssue[] | null;
  createdProfile: Profile | null;
}

export interface UpdateAPIData {
  error: string | ZodIssue[] | null;
  updatedProfile: Profile | null;
}

export interface UpdateVisibilityData {
  error: string | ZodIssue[] | null;
  updatedVisibility: User | null;
}
