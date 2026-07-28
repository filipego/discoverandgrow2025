const canvaDesignPath = /^\/design\/([^/]+)\/([^/]+)\/(?:watch|view)\/?$/;

export function getCanvaEmbedUrl(canvaUrl) {
  if (!canvaUrl) return null;

  try {
    const url = new URL(canvaUrl);
    const isCanvaHost =
      url.hostname === "www.canva.com" || url.hostname === "canva.com";
    const match = url.pathname.match(canvaDesignPath);

    if (!isCanvaHost || !match) return null;

    const [, designId, versionId] = match;
    return `https://www.canva.com/design/${designId}/${versionId}/watch?embed`;
  } catch {
    return null;
  }
}
