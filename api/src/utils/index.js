/**
 * Remove fields from object
 * @param {Object} obj 
 * @param {Array<string>} fields 
 * @returns {Object} 
 */
export const removeFields = (obj, fields) => {
  const newObj = { ...obj };

  fields.forEach((field) => {
    delete newObj[field];
  });

  return newObj;
};
