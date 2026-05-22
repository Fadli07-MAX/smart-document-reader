export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8787";

export type InvoiceData = {
  invoiceNumber: string;
  vendor: string;
  date: string;
  total: string;
};

export type DocumentRow = {
  id: string;
  filename: string;
  status: string;
  structured_data: string | null;
  file_key: string | null;
  file_size: number | null;
  mime_type: string | null;
  created_at: string;
};

export type DocumentDetail = DocumentRow & {
  raw_text: string | null;
};

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

type FileUrlResponse = {
  url: string;
  expiresIn: number;
  filename: string;
  mimeType: string;
};

export async function uploadDocument(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/documents/upload`, {
    method: "POST",
    body: formData,
  });

  const json = await readApiJson<{
    id: string;
    filename: string;
    status: string;
    fileKey: string;
    fileSize: number;
    mimeType: string;
    structuredData: InvoiceData;
    createdAt: string;
  }>(response);

  if (!response.ok || !json.success || !json.data) {
    throw new Error(json.error ?? "Upload failed.");
  }

  return json.data;
}

export async function getDocuments() {
  const response = await fetch(`${API_BASE_URL}/documents`, {
    cache: "no-store",
  });

  const json = await readApiJson<DocumentRow[]>(response);

  if (!response.ok || !json.success || !json.data) {
    throw new Error(json.error ?? "Failed to load documents.");
  }

  return json.data;
}

export async function getDocument(id: string) {
  const response = await fetch(`${API_BASE_URL}/documents/${id}`, {
    cache: "no-store",
  });

  const json = await readApiJson<DocumentDetail>(response);

  if (!response.ok || !json.success || !json.data) {
    throw new Error(json.error ?? "Failed to load document.");
  }

  return json.data;
}

export async function getDocumentFileUrl(id: string) {
  const response = await fetch(`${API_BASE_URL}/documents/${id}/file`, {
    cache: "no-store",
  });

  const json = await readApiJson<FileUrlResponse>(response);

  if (!response.ok || !json.success || !json.data) {
    throw new Error(json.error ?? "Failed to create file link.");
  }

  return json.data;
}

export function parseInvoiceData(value: string | null | undefined): InvoiceData {
  if (!value) {
    return emptyInvoiceData();
  }

  try {
    const parsed = JSON.parse(value) as Partial<InvoiceData>;

    return {
      invoiceNumber: typeof parsed.invoiceNumber === "string" ? parsed.invoiceNumber : "",
      vendor: typeof parsed.vendor === "string" ? parsed.vendor : "",
      date: typeof parsed.date === "string" ? parsed.date : "",
      total: typeof parsed.total === "string" ? parsed.total : "",
    };
  } catch {
    return emptyInvoiceData();
  }
}

function emptyInvoiceData(): InvoiceData {
  return {
    invoiceNumber: "",
    vendor: "",
    date: "",
    total: "",
  };
}

async function readApiJson<T>(response: Response): Promise<ApiResponse<T>> {
  const text = await response.text();

  if (!text) {
    return {
      success: false,
      error: response.ok ? "Empty API response." : `Request failed with status ${response.status}.`,
    };
  }

  try {
    return JSON.parse(text) as ApiResponse<T>;
  } catch {
    return {
      success: false,
      error: response.ok ? "Invalid API response." : `Request failed with status ${response.status}.`,
    };
  }
}
