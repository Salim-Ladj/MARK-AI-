import { getSupabaseClient } from '../config/supabase';
import { signToken } from '../utils/jwt';
import { verifyPassword } from '../utils/hashPassword';

// AUTH SERVICE
export const authService = {
  login: async (email: string, passwordPlain: string) => {
    const { data, error } = await getSupabaseClient()
      .from('Marketing')
      .select('id, created_at, full_name, email, password, role')
      .ilike('email', email)
      .maybeSingle();

    if (error) throw new Error(`Unable to read Marketing user: ${error.message}`);
    if (!data) {
      throw new Error('User not found with this email');
    }
    if (!verifyPassword(passwordPlain, data.password)) {
      throw new Error('Invalid credentials');
    }

    const user = {
      id: String(data.id),
      email: data.email,
      name: data.full_name,
      role: data.role,
      createdAt: data.created_at
    };

    const token = signToken({
      id: user.id,
      email: user.email,
      role: user.role
    });
    return { user, token };
  },
  getUserById: async (id: string) => {
    const { data, error } = await getSupabaseClient()
      .from('Marketing')
      .select('id, created_at, full_name, email, role')
      .eq('id', id)
      .maybeSingle();

    if (error) throw new Error(`Unable to read Marketing user: ${error.message}`);
    if (!data) return null;

    return {
      id: String(data.id),
      email: data.email,
      name: data.full_name,
      role: data.role,
      createdAt: data.created_at
    };
  }
};

const databaseNotMigrated = (): never => {
  throw new Error('This endpoint requires its Supabase table to be created by the data migration owner.');
};

export const brandService = { getAll: databaseNotMigrated, getById: databaseNotMigrated, create: databaseNotMigrated, update: databaseNotMigrated, delete: databaseNotMigrated };
export const campaignService = { getAll: databaseNotMigrated, getById: databaseNotMigrated, create: databaseNotMigrated, update: databaseNotMigrated, delete: databaseNotMigrated };
export const taskService = { getAll: databaseNotMigrated, getById: databaseNotMigrated, create: databaseNotMigrated, submitWork: databaseNotMigrated, reviewSubmission: databaseNotMigrated, updateStatus: databaseNotMigrated };
export const assetService = { getAll: databaseNotMigrated, create: databaseNotMigrated, delete: databaseNotMigrated, rename: databaseNotMigrated };
export const calendarService = { getAll: databaseNotMigrated, create: databaseNotMigrated, update: databaseNotMigrated, delete: databaseNotMigrated };
export const creativeTeamService = { getAll: databaseNotMigrated, getById: databaseNotMigrated };
