// Refactor this function.

export function modifyResult(result) {
  var common_name = result.common_name || "-";
  common_name = common_name.replace(/;/g, ", ");

  var bloom_time = result.bloom_time || "-";
  bloom_time = bloom_time.replace(/;/g, ", ");

  var plant_type = result.plant_type || "-";
  plant_type = plant_type.replace(/;/g, ", ");

  var water_needs = result.water_needs || "-";
  water_needs = water_needs.replace(/;/g, ", ");

  var size_at_maturity = result.size_at_maturity || "-";
  size_at_maturity = size_at_maturity.replace(/;/g, ", ");

  var appropriate_location = result.appropriate_location || "-";
  appropriate_location = appropriate_location.replace(/;/g, ", ");

  var suitable_site_conditions = result.suitable_site_conditions || "-";
  suitable_site_conditions = suitable_site_conditions.replace(/;/g, ", ");

  var modifiedResults = {
    common_name: common_name,
    bloom_time: bloom_time,
    plant_type: plant_type,
    water_needs: water_needs,
    size_at_maturity: size_at_maturity,
    appropriate_location: appropriate_location,
    suitable_site_conditions: suitable_site_conditions
  };

  return modifiedResults;
}
