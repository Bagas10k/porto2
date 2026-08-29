export interface HasilEmbedVideo {
  embedUrl: string;
  urlAsli: string;
  tipePenyedia: "GOOGLE_DRIVE" | "YOUTUBE" | "VIMEO" | "LANGSUNG";
  valid: boolean;
}

export function konversiTautanVideo(urlInput: string): HasilEmbedVideo {
  if (!urlInput || typeof urlInput !== "string") {
    return {
      embedUrl: "",
      urlAsli: "",
      tipePenyedia: "LANGSUNG",
      valid: false,
    };
  }

  const urlBersih = urlInput.trim();

  // 1. Deteksi Google Drive
  // Format: https://drive.google.com/file/d/ID/view, https://drive.google.com/open?id=ID
  const polaGoogleDriveFile = /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/i;
  const polaGoogleDriveId = /drive\.google\.com\/.*[?&]id=([a-zA-Z0-9_-]+)/i;

  const cocokFile = urlBersih.match(polaGoogleDriveFile);
  const cocokId = urlBersih.match(polaGoogleDriveId);

  const fileIdDrive = cocokFile?.[1] || cocokId?.[1];
  if (fileIdDrive) {
    return {
      embedUrl: `https://drive.google.com/file/d/${fileIdDrive}/preview`,
      urlAsli: urlBersih,
      tipePenyedia: "GOOGLE_DRIVE",
      valid: true,
    };
  }

  // 2. Deteksi YouTube
  const polaYoutube = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const cocokYoutube = urlBersih.match(polaYoutube);
  if (cocokYoutube?.[1]) {
    return {
      embedUrl: `https://www.youtube-nocookie.com/embed/${cocokYoutube[1]}`,
      urlAsli: urlBersih,
      tipePenyedia: "YOUTUBE",
      valid: true,
    };
  }

  // 3. Deteksi Vimeo
  const polaVimeo = /vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/i;
  const cocokVimeo = urlBersih.match(polaVimeo);
  if (cocokVimeo?.[3]) {
    return {
      embedUrl: `https://player.vimeo.com/video/${cocokVimeo[3]}`,
      urlAsli: urlBersih,
      tipePenyedia: "VIMEO",
      valid: true,
    };
  }

  return {
    embedUrl: urlBersih,
    urlAsli: urlBersih,
    tipePenyedia: "LANGSUNG",
    valid: Boolean(urlBersih),
  };
}
