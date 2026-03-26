export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      colleges: {
        Row: {
          id: string;
          name: string;
          city: string | null;
          state_name: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          city?: string | null;
          state_name?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          city?: string | null;
          state_name?: string | null;
          created_at?: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          user_id: string;
          display_name: string;
          college_id: string | null;
          course: string | null;
          speciality: string | null;
          bio: string | null;
          role: "mentee" | "mentor";
          ug_college_id: string | null;
          ug_course: string | null;
          ug_year: number | null;
          pg_college_id: string | null;
          pg_course: string | null;
          pg_specialty: string | null;
          pg_year: number | null;
          super_college_id: string | null;
          super_course: string | null;
          super_specialty: string | null;
          super_year: number | null;
          time_slots: string[] | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          display_name: string;
          college_id?: string | null;
          course?: string | null;
          speciality?: string | null;
          bio?: string | null;
          role?: "mentee" | "mentor";
          ug_college_id?: string | null;
          ug_course?: string | null;
          ug_year?: number | null;
          pg_college_id?: string | null;
          pg_course?: string | null;
          pg_specialty?: string | null;
          pg_year?: number | null;
          super_college_id?: string | null;
          super_course?: string | null;
          super_specialty?: string | null;
          super_year?: number | null;
          time_slots?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          display_name?: string;
          college_id?: string | null;
          course?: string | null;
          speciality?: string | null;
          bio?: string | null;
          role?: "mentee" | "mentor";
          ug_college_id?: string | null;
          ug_course?: string | null;
          ug_year?: number | null;
          pg_college_id?: string | null;
          pg_course?: string | null;
          pg_specialty?: string | null;
          pg_year?: number | null;
          super_college_id?: string | null;
          super_course?: string | null;
          super_specialty?: string | null;
          super_year?: number | null;
          time_slots?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type College = Database["public"]["Tables"]["colleges"]["Row"];
