export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      account_statements: {
        Row: {
          account_id: string
          created_at: string
          end_balance: number
          end_date: string
          expenses: number
          id: string
          income: number
          start_balance: number
          start_date: string
          status: string
          updated_at: string
        }
        Insert: {
          account_id: string
          created_at?: string
          end_balance: number
          end_date: string
          expenses?: number
          id?: string
          income?: number
          start_balance: number
          start_date: string
          status?: string
          updated_at?: string
        }
        Update: {
          account_id?: string
          created_at?: string
          end_balance?: number
          end_date?: string
          expenses?: number
          id?: string
          income?: number
          start_balance?: number
          start_date?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "account_statements_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "cash_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      account_transactions: {
        Row: {
          account_id: string
          amount: number
          category_id: string | null
          created_at: string
          description: string | null
          id: string
          statement_id: string
          subcategory_id: string | null
          transaction_date: string
          transaction_time: string
          transaction_type: string
          updated_at: string
        }
        Insert: {
          account_id: string
          amount: number
          category_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          statement_id: string
          subcategory_id?: string | null
          transaction_date: string
          transaction_time: string
          transaction_type: string
          updated_at?: string
        }
        Update: {
          account_id?: string
          amount?: number
          category_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          statement_id?: string
          subcategory_id?: string | null
          transaction_date?: string
          transaction_time?: string
          transaction_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "account_transactions_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "cash_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "account_transactions_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "account_transactions_statement_id_fkey"
            columns: ["statement_id"]
            isOneToOne: false
            referencedRelation: "account_statements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "account_transactions_subcategory_id_fkey"
            columns: ["subcategory_id"]
            isOneToOne: false
            referencedRelation: "sub_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      cash_accounts: {
        Row: {
          account_type: string
          closing_day_type: string
          closing_day_value: number | null
          created_at: string
          currency: string
          description: string | null
          id: string
          initial_balance: number
          is_active: boolean
          name: string
          sort_order: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          account_type?: string
          closing_day_type: string
          closing_day_value?: number | null
          created_at?: string
          currency: string
          description?: string | null
          id?: string
          initial_balance?: number
          is_active?: boolean
          name: string
          sort_order?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          account_type?: string
          closing_day_type?: string
          closing_day_value?: number | null
          created_at?: string
          currency?: string
          description?: string | null
          id?: string
          initial_balance?: number
          is_active?: boolean
          name?: string
          sort_order?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string | null
          icon: string | null
          id: string
          is_deleted: boolean | null
          name: string
          sort_order: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          icon?: string | null
          id?: string
          is_deleted?: boolean | null
          name: string
          sort_order?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          icon?: string | null
          id?: string
          is_deleted?: boolean | null
          name?: string
          sort_order?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      category_templates: {
        Row: {
          created_at: string | null
          icon: string | null
          id: string
          is_active: boolean | null
          name: Json
          sort_order: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name: Json
          sort_order?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name?: Json
          sort_order?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          first_name?: string | null
          id: string
          last_name?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      sub_categories: {
        Row: {
          category_id: string
          created_at: string | null
          id: string
          is_deleted: boolean | null
          name: string
          sort_order: number | null
          updated_at: string | null
        }
        Insert: {
          category_id: string
          created_at?: string | null
          id?: string
          is_deleted?: boolean | null
          name: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Update: {
          category_id?: string
          created_at?: string | null
          id?: string
          is_deleted?: boolean | null
          name?: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sub_categories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      subcategory_templates: {
        Row: {
          category_template_id: string
          created_at: string | null
          id: string
          is_active: boolean | null
          name: Json
          sort_order: number | null
          updated_at: string | null
        }
        Insert: {
          category_template_id: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name: Json
          sort_order?: number | null
          updated_at?: string | null
        }
        Update: {
          category_template_id?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name?: Json
          sort_order?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subcategory_templates_category_template_id_fkey"
            columns: ["category_template_id"]
            isOneToOne: false
            referencedRelation: "category_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          created_at: string
          current_period_ends_at: string | null
          current_period_starts_at: string | null
          id: string
          plan_type: Database["public"]["Enums"]["subscription_plan_type"]
          status: Database["public"]["Enums"]["subscription_status"]
          trial_ends_at: string
          trial_starts_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_period_ends_at?: string | null
          current_period_starts_at?: string | null
          id?: string
          plan_type?: Database["public"]["Enums"]["subscription_plan_type"]
          status?: Database["public"]["Enums"]["subscription_status"]
          trial_ends_at?: string
          trial_starts_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_period_ends_at?: string | null
          current_period_starts_at?: string | null
          id?: string
          plan_type?: Database["public"]["Enums"]["subscription_plan_type"]
          status?: Database["public"]["Enums"]["subscription_status"]
          trial_ends_at?: string
          trial_starts_at?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_statement_period: {
        Args: {
          p_closing_day_type: string
          p_closing_day_value?: number
          p_reference_date?: string
        }
        Returns: {
          start_date: string
          end_date: string
        }[]
      }
      check_account_future_statements: {
        Args: {
          p_account_id: string
        }
        Returns: Json
      }
      check_accounts_statements: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      close_expired_statements: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      update_future_statements: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
    }
    Enums: {
      subscription_plan_type: "trial" | "monthly" | "yearly"
      subscription_status: "trial" | "active" | "expired" | "cancelled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
