export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      survey_responses: {
        Row: {
          additional_support: string | null
          age: string | null
          app_features: string[] | null
          app_interest: string | null
          biggest_challenge: string | null
          cancer_type: string | null
          children: string | null
          communication_frequency: string | null
          communication_methods: string[] | null
          created_at: string
          current_resources: string[] | null
          diagnosis_date: string | null
          email: string | null
          gender: string | null
          healthcare_involvement: string | null
          id: string
          living_situation: string | null
          main_challenges: string[] | null
          name: string | null
          other_comments: string | null
          phone: string | null
          preferred_devices: string[] | null
          program_interest: string | null
          relationship_duration: string | null
          relationship_status: string | null
          relationship_type: string | null
          resource_gaps: string | null
          role: string | null
          support_sources: string[] | null
          technology_comfort: string | null
          treatment_status: string | null
          updated_at: string
        }
        Insert: {
          additional_support?: string | null
          age?: string | null
          app_features?: string[] | null
          app_interest?: string | null
          biggest_challenge?: string | null
          cancer_type?: string | null
          children?: string | null
          communication_frequency?: string | null
          communication_methods?: string[] | null
          created_at?: string
          current_resources?: string[] | null
          diagnosis_date?: string | null
          email?: string | null
          gender?: string | null
          healthcare_involvement?: string | null
          id?: string
          living_situation?: string | null
          main_challenges?: string[] | null
          name?: string | null
          other_comments?: string | null
          phone?: string | null
          preferred_devices?: string[] | null
          program_interest?: string | null
          relationship_duration?: string | null
          relationship_status?: string | null
          relationship_type?: string | null
          resource_gaps?: string | null
          role?: string | null
          support_sources?: string[] | null
          technology_comfort?: string | null
          treatment_status?: string | null
          updated_at?: string
        }
        Update: {
          additional_support?: string | null
          age?: string | null
          app_features?: string[] | null
          app_interest?: string | null
          biggest_challenge?: string | null
          cancer_type?: string | null
          children?: string | null
          communication_frequency?: string | null
          communication_methods?: string[] | null
          created_at?: string
          current_resources?: string[] | null
          diagnosis_date?: string | null
          email?: string | null
          gender?: string | null
          healthcare_involvement?: string | null
          id?: string
          living_situation?: string | null
          main_challenges?: string[] | null
          name?: string | null
          other_comments?: string | null
          phone?: string | null
          preferred_devices?: string[] | null
          program_interest?: string | null
          relationship_duration?: string | null
          relationship_status?: string | null
          relationship_type?: string | null
          resource_gaps?: string | null
          role?: string | null
          support_sources?: string[] | null
          technology_comfort?: string | null
          treatment_status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
