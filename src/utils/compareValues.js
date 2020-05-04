const compareValues = (key, order = 'asc') => {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      // property doesn't exist on either object
      return 0;
    }

    let varA = a[key]
    if (typeof a[key] === 'string') {
     varA = a[key].toUpperCase()
    }
    if (a[key] instanceof Date) {
     varA = new Date(a[key])
    }

    let varB = b[key]
    if (typeof b[key] === 'string') {
      varB = b[key].toUpperCase()
     }
     if (b[key] instanceof Date) {
      varB = new Date(b[key])
     }

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return (
      (order === 'desc') ? (comparison * -1) : comparison
    );
  };
}

export { compareValues };