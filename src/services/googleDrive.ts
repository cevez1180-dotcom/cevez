export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  webViewLink?: string;
  webContentLink?: string;
  iconLink?: string;
  thumbnailLink?: string;
  size?: string;
  modifiedTime?: string;
  createdTime?: string;
  owners?: { displayName: string; emailAddress: string; photoLink?: string }[];
  starred?: boolean;
}

export interface DriveQuota {
  limit?: string;
  usage?: string;
  usageInDrive?: string;
  usageInDriveTrash?: string;
  user?: { displayName: string; emailAddress: string; photoLink?: string };
}

const DRIVE_API_URL = 'https://www.googleapis.com/drive/v3';
const DRIVE_UPLOAD_URL = 'https://www.googleapis.com/upload/drive/v3/files';

/**
 * List files from user's Google Drive with optional search query & filter
 */
export async function listDriveFiles(
  accessToken: string, 
  options: {
    query?: string;
    filterType?: 'all' | 'cv' | 'documents' | 'folders';
    pageSize?: number;
    pageToken?: string;
  } = {}
): Promise<{ files: DriveFile[]; nextPageToken?: string }> {
  const { query, filterType = 'all', pageSize = 30, pageToken } = options;

  let q = "trashed = false";

  // Filter by document type or CV keywords
  if (filterType === 'cv') {
    q += " and (name contains 'cv' or name contains 'CV' or name contains 'resume' or name contains 'Resume' or name contains 'سيرة' or mimeType = 'application/pdf' or mimeType contains 'word' or mimeType = 'application/vnd.google-apps.document')";
  } else if (filterType === 'documents') {
    q += " and (mimeType = 'application/pdf' or mimeType contains 'word' or mimeType = 'application/vnd.google-apps.document' or mimeType = 'text/plain')";
  } else if (filterType === 'folders') {
    q += " and mimeType = 'application/vnd.google-apps.folder'";
  }

  if (query && query.trim() !== '') {
    const escapedQuery = query.replace(/'/g, "\\'");
    q += ` and name contains '${escapedQuery}'`;
  }

  const params = new URLSearchParams({
    q,
    pageSize: String(pageSize),
    fields: 'nextPageToken, files(id, name, mimeType, webViewLink, webContentLink, iconLink, thumbnailLink, size, modifiedTime, createdTime, owners, starred)',
    orderBy: 'modifiedTime desc',
  });

  if (pageToken) {
    params.append('pageToken', pageToken);
  }

  const response = await fetch(`${DRIVE_API_URL}/files?${params.toString()}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData?.error?.message || `فشل استرجاع الملفات من Google Drive (${response.status})`);
  }

  const data = await response.json();
  return {
    files: data.files || [],
    nextPageToken: data.nextPageToken,
  };
}

/**
 * Get Google Drive storage quota info
 */
export async function getDriveQuota(accessToken: string): Promise<DriveQuota> {
  const response = await fetch(`${DRIVE_API_URL}/about?fields=user,storageQuota`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    throw new Error('فشل جلب بيانات مساحة التخزين من Google Drive');
  }

  const data = await response.json();
  return {
    limit: data.storageQuota?.limit,
    usage: data.storageQuota?.usage,
    usageInDrive: data.storageQuota?.usageInDrive,
    user: data.user,
  };
}

/**
 * Upload a local file (e.g. CV PDF, Word, or Image) to Google Drive
 */
export async function uploadFileToDrive(
  accessToken: string,
  file: File,
  folderId?: string
): Promise<DriveFile> {
  const metadata: any = {
    name: file.name,
    mimeType: file.type || 'application/octet-stream',
  };

  if (folderId) {
    metadata.parents = [folderId];
  }

  const form = new FormData();
  form.append(
    'metadata',
    new Blob([JSON.stringify(metadata)], { type: 'application/json; charset=UTF-8' })
  );
  form.append('file', file);

  const response = await fetch(
    `${DRIVE_UPLOAD_URL}?uploadType=multipart&fields=id,name,mimeType,webViewLink,webContentLink,size,modifiedTime`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: form,
    }
  );

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message || 'فشل رفع الملف إلى Google Drive');
  }

  return await response.json();
}

/**
 * Create a formatted Resume / STAR Career Report as a Google Doc or Markdown File in Google Drive
 */
export async function createCareerReportInDrive(
  accessToken: string,
  title: string,
  content: string
): Promise<DriveFile> {
  const metadata = {
    name: `${title} - Career Profile ATS.txt`,
    mimeType: 'text/plain',
    description: 'تم إنشاء هذا التقرير وتجهيزه عبر منصة Career Profile للارتقاء بالمسار المهني واجتياز أنظمة الـ ATS.',
  };

  const form = new FormData();
  form.append(
    'metadata',
    new Blob([JSON.stringify(metadata)], { type: 'application/json; charset=UTF-8' })
  );
  form.append('file', new Blob([content], { type: 'text/plain; charset=UTF-8' }));

  const response = await fetch(
    `${DRIVE_UPLOAD_URL}?uploadType=multipart&fields=id,name,mimeType,webViewLink,webContentLink,size,modifiedTime`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: form,
    }
  );

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message || 'فشل حفظ تقرير السيرة الذاتية في Google Drive');
  }

  return await response.json();
}

/**
 * Delete a file from Google Drive (Mandatory user confirmation required before calling)
 */
export async function deleteDriveFile(accessToken: string, fileId: string): Promise<boolean> {
  const response = await fetch(`${DRIVE_API_URL}/files/${fileId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message || 'فشل حذف الملف من Google Drive');
  }

  return true;
}

/**
 * Helper to format file size in human-readable units
 */
export function formatBytes(bytes?: string | number, decimals = 1): string {
  if (!bytes) return 'غير محدد';
  const numBytes = typeof bytes === 'string' ? parseInt(bytes, 10) : bytes;
  if (isNaN(numBytes) || numBytes === 0) return '0 B';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];

  const i = Math.floor(Math.log(numBytes) / Math.log(k));
  return parseFloat((numBytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
