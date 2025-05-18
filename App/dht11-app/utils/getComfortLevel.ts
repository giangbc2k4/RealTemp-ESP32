export function getComfortLevel(temperature: number, humidity: number): string {
  if (temperature < 15) return "Lạnh";
  if (temperature >= 15 && temperature <= 25) {
    if (humidity >= 30 && humidity <= 60) return "Dễ chịu";
    if (humidity < 30) return "Khô";
    return "Ẩm ướt";
  }
  if (temperature > 25) {
    if (humidity >= 30 && humidity <= 60) return "Nóng";
    if (humidity < 30) return "Khô và nóng";
    return "Nóng ẩm";
  }
  return "Không rõ";
}


export function getColorByTemperature(temperature: number): string {
  if (temperature < 15) return "#0099FF";    // xanh dương 
  if (temperature >= 15 && temperature <= 25) return "#00C27A"; // xanh lá
  return "#FF5733";  // đỏ cam 
}
