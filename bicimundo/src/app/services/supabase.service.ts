import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://zypbnamuapdrrlggitgv.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5cGJuYW11YXBkcnJsZ2dpdGd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyOTQ4NDgsImV4cCI6MjA2Mzg3MDg0OH0.DkW01pwa_M1IBHwta40EdqHy9p80l2NvwS4EO5S_1ao';
const BUCKET_NAME = 'imagenes';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private client: SupabaseClient;

  constructor() {
    this.client = createClient(SUPABASE_URL, SUPABASE_KEY);
  }

  getClient(): SupabaseClient {
    return this.client;
  }

  async uploadImage(file: File): Promise<string> {
    const fileName = `${Date.now()}_${file.name}`;
    const { error } = await this.client.storage
      .from(BUCKET_NAME)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) throw new Error('Error al subir la imagen: ' + error.message);

    return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/${fileName}`;
  }
}
