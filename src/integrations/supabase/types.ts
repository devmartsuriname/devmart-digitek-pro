export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      blog_posts: {
        Row: {
          author_id: string | null
          body_mdx: string | null
          cover_url: string | null
          created_at: string
          created_by: string | null
          date: string
          featured: boolean
          id: string
          seo_desc: string | null
          seo_title: string | null
          slug: string
          status: string
          summary: string | null
          tags: string[] | null
          title: string
          updated_at: string
          updated_by: string | null
          views: number
        }
        Insert: {
          author_id?: string | null
          body_mdx?: string | null
          cover_url?: string | null
          created_at?: string
          created_by?: string | null
          date?: string
          featured?: boolean
          id?: string
          seo_desc?: string | null
          seo_title?: string | null
          slug: string
          status?: string
          summary?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string
          updated_by?: string | null
          views?: number
        }
        Update: {
          author_id?: string | null
          body_mdx?: string | null
          cover_url?: string | null
          created_at?: string
          created_by?: string | null
          date?: string
          featured?: boolean
          id?: string
          seo_desc?: string | null
          seo_title?: string | null
          slug?: string
          status?: string
          summary?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string
          updated_by?: string | null
          views?: number
        }
        Relationships: []
      }
      faqs: {
        Row: {
          answer: string
          category: string | null
          created_at: string
          created_by: string | null
          id: string
          order_num: number
          question: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          answer: string
          category?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          order_num?: number
          question: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          answer?: string
          category?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          order_num?: number
          question?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      leads: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          source: string | null
          status: string
          subject: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          source?: string | null
          status?: string
          subject?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          source?: string | null
          status?: string
          subject?: string | null
        }
        Relationships: []
      }
      media: {
        Row: {
          alt: string | null
          created_at: string
          folder: string | null
          height: number | null
          id: string
          type: string | null
          url: string
          width: number | null
        }
        Insert: {
          alt?: string | null
          created_at?: string
          folder?: string | null
          height?: number | null
          id?: string
          type?: string | null
          url: string
          width?: number | null
        }
        Update: {
          alt?: string | null
          created_at?: string
          folder?: string | null
          height?: number | null
          id?: string
          type?: string | null
          url?: string
          width?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          body: string | null
          client: string | null
          cover_url: string | null
          created_at: string
          created_by: string | null
          date: string | null
          featured: boolean
          gallery: Json | null
          id: string
          seo_desc: string | null
          seo_title: string | null
          slug: string
          status: string
          summary: string | null
          tech: string[] | null
          title: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          body?: string | null
          client?: string | null
          cover_url?: string | null
          created_at?: string
          created_by?: string | null
          date?: string | null
          featured?: boolean
          gallery?: Json | null
          id?: string
          seo_desc?: string | null
          seo_title?: string | null
          slug: string
          status?: string
          summary?: string | null
          tech?: string[] | null
          title: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          body?: string | null
          client?: string | null
          cover_url?: string | null
          created_at?: string
          created_by?: string | null
          date?: string | null
          featured?: boolean
          gallery?: Json | null
          id?: string
          seo_desc?: string | null
          seo_title?: string | null
          slug?: string
          status?: string
          summary?: string | null
          tech?: string[] | null
          title?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      services: {
        Row: {
          body: string | null
          created_at: string
          created_by: string | null
          icon_url: string | null
          id: string
          order_num: number
          seo_desc: string | null
          seo_title: string | null
          slug: string
          status: string
          summary: string | null
          title: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          body?: string | null
          created_at?: string
          created_by?: string | null
          icon_url?: string | null
          id?: string
          order_num?: number
          seo_desc?: string | null
          seo_title?: string | null
          slug: string
          status?: string
          summary?: string | null
          title: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          body?: string | null
          created_at?: string
          created_by?: string | null
          icon_url?: string | null
          id?: string
          order_num?: number
          seo_desc?: string | null
          seo_title?: string | null
          slug?: string
          status?: string
          summary?: string | null
          title?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      settings: {
        Row: {
          analytics: Json | null
          contact_email: string | null
          contact_phone: string | null
          created_at: string
          id: string
          logo_url: string | null
          meta_desc: string | null
          meta_title: string | null
          primary_color: string | null
          site_name: string | null
          social: Json | null
          theme: string | null
          updated_at: string
        }
        Insert: {
          analytics?: Json | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          id?: string
          logo_url?: string | null
          meta_desc?: string | null
          meta_title?: string | null
          primary_color?: string | null
          site_name?: string | null
          social?: Json | null
          theme?: string | null
          updated_at?: string
        }
        Update: {
          analytics?: Json | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          id?: string
          logo_url?: string | null
          meta_desc?: string | null
          meta_title?: string | null
          primary_color?: string | null
          site_name?: string | null
          social?: Json | null
          theme?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      team: {
        Row: {
          bio: string | null
          created_at: string
          created_by: string | null
          id: string
          name: string
          order_num: number
          photo_url: string | null
          role: string | null
          slug: string
          socials: Json | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          bio?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          name: string
          order_num?: number
          photo_url?: string | null
          role?: string | null
          slug: string
          socials?: Json | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          bio?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          name?: string
          order_num?: number
          photo_url?: string | null
          role?: string | null
          slug?: string
          socials?: Json | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "editor" | "viewer"
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
    Enums: {
      app_role: ["admin", "editor", "viewer"],
    },
  },
} as const
