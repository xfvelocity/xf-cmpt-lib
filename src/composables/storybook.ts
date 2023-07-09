export const buildDefaultProps = (component: any) => {
  let obj = {};

  Object.keys(component.props).forEach((x) => {
    obj[x] = component.props[x].default;
  });

  return obj;
};
