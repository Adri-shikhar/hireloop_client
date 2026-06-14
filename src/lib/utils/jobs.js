export function normalizeId(id) {
  if (!id) return "";
  if (typeof id === "string") return id;
  if (typeof id === "object" && id.$oid) return id.$oid;
  return String(id);
}
