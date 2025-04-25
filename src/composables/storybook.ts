export const buildDefaultProps = (component: any) => {
  const obj = {};

  Object.keys(component.props).forEach((x) => {
    obj[x] = component.props[x].default;
  });

  return obj;
};
