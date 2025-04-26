"use server";

import Airtable from "airtable";
import { env } from "@/env";
import { formatDate } from "@/lib/utils";

// Initialize Airtable
const base = new Airtable({ apiKey: env.AIRTABLE_API_KEY }).base(env.AIRTABLE_BASE_ID);

export interface KategorijaRecord {
  id: string;
  name: string;
  sport: string[];
  notes: string;
  assignee: {
    id: string;
    email: string;
    name: string;
  };
  vrstaLige: string;
  status: string;
  teams: string[];
  startdate: string;
  enddate: string;
  [key: string]: any;
}

export interface SportRecord {
  id: string;
  name: string;
}

/**
 * Fetch all Kategorije from Airtable
 */
export async function getKategorije(): Promise<KategorijaRecord[]> {
  try {
    const records = await base('Kategorija')
      .select({
        view: "Grid view"
      })
      .all();
    
    return records.map(record => {
      return {
        id: record.id,
        name: record.get('Name') as string,
        sport: record.get('Sport') as string[],
        notes: record.get('Notes') as string,
        assignee: record.get('Assignee') as { id: string; email: string; name: string; },
        status: record.get('Status') as string,
        vrstaLige: record.get('LeagueType') as string,
        teams: record.get('Momčadi') as string[],
        startdate: formatDate(record.get('StartDate') as string),
        enddate: formatDate(record.get('EndDate') as string),
      };
    });
  } catch (error) {
    console.error("Error fetching Kategorije from Airtable:", error);
    throw new Error("Failed to fetch Kategorije");
  }
}

/**
 * Fetch a single Sport record by ID from Airtable
 */
export async function getSport(id: string): Promise<SportRecord> {
  try {
    const record = await base('Sport').find(id);
    
    return {
      id: record.id,
      name: record.get('Sport Name') as string,
    };
  } catch (error) {
    console.error("Error fetching Sport from Airtable:", error);
    throw new Error("Failed to fetch Sport");
  }
}

/**
 * Fetch all Sports from Airtable
 */
export async function getSports(): Promise<SportRecord[]> {
  try {
    const records = await base('Sport')
      .select({
        view: "Grid view"
      })
      .all();
    
    return records.map(record => {
      return {
        id: record.id,
        name: record.get('Sport Name') as string,
      };
    });
  } catch (error) {
    console.error("Error fetching Sports from Airtable:", error);
    throw new Error("Failed to fetch Sports");
  }
}

/**
 * Create a new Kategorija in Airtable
 */
export async function createKategorija(data: {
  name: string;
  sport: string[];
  notes?: string;
  assignee?: { id: string; email: string; name: string };
  vrstaLige: string;
  status: string;
  startdate: string;
  enddate: string;
}): Promise<KategorijaRecord> {
  try {
    const record = await base('Kategorija').create({
      "Name": data.name,
      "Sport": data.sport,
      "Notes": data.notes || "",
      "Assignee": data.assignee,
      "Status": data.status,
      "LeagueType": data.vrstaLige,
      "StartDate": data.startdate,
      "EndDate": data.enddate,
    });
    
    return {
      id: record.id,
      name: record.get('Name') as string,
      sport: record.get('Sport') as string[],
      notes: record.get('Notes') as string,
      assignee: record.get('Assignee') as { id: string; email: string; name: string; },
      status: record.get('Status') as string,
      vrstaLige: record.get('LeagueType') as string,
      teams: record.get('Momčadi') as string[] || [],
      startdate: formatDate(record.get('StartDate') as string),
      enddate: formatDate(record.get('EndDate') as string),
    };
  } catch (error) {
    console.error("Error creating Kategorija in Airtable:", error);
    throw new Error("Failed to create Kategorija");
  }
}

/**
 * Update an existing Kategorija in Airtable
 */
export async function updateKategorija(data: {
  id: string;
  name: string;
  sport: string[];
  notes?: string;
  assignee?: { id: string; email: string; name: string };
  vrstaLige: string;
  status: string;
  startdate: string;
  enddate: string;
}): Promise<KategorijaRecord> {
  try {
    const record = await base('Kategorija').update(data.id, {
      "Name": data.name,
      "Sport": data.sport,
      "Notes": data.notes || "",
      "Assignee": data.assignee,
      "Status": data.status,
      "LeagueType": data.vrstaLige,
      "StartDate": data.startdate,
      "EndDate": data.enddate,
    });
    
    return {
      id: record.id,
      name: record.get('Name') as string,
      sport: record.get('Sport') as string[],
      notes: record.get('Notes') as string,
      assignee: record.get('Assignee') as { id: string; email: string; name: string; },
      status: record.get('Status') as string,
      vrstaLige: record.get('LeagueType') as string,
      teams: record.get('Momčadi') as string[] || [],
      startdate: formatDate(record.get('StartDate') as string),
      enddate: formatDate(record.get('EndDate') as string),
    };
  } catch (error) {
    console.error("Error updating Kategorija in Airtable:", error);
    throw new Error("Failed to update Kategorija");
  }
} 