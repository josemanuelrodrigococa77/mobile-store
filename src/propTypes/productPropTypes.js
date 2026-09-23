import PropTypes from "prop-types";

const optionPropType = PropTypes.shape({
  code: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
});

export const productPropType = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,

  brand: PropTypes.string,
  model: PropTypes.string,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  imgUrl: PropTypes.string,

  primaryCamera: PropTypes.arrayOf(PropTypes.string),
  secondaryCamera: PropTypes.arrayOf(PropTypes.string),

  dimensions: PropTypes.string,

  options: PropTypes.shape({
    colors: PropTypes.arrayOf(optionPropType),
    storages: PropTypes.arrayOf(optionPropType),
  }).isRequired,
});
