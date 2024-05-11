import { model, Schema } from 'mongoose';

const NestedMenuSchema = new Schema({
  nestedNameNav: {
    type: String,
  },
  nestedLink: {
    type: String,
  },
});

const NavbarItemSchema = new Schema({
  nameNav: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    default: null,
  },
  isDrop: {
    type: Boolean,
    default: false,
  },
  nestedMenu: [NestedMenuSchema],
});

const NavbarItem = model('NavbarItem', NavbarItemSchema);
export default NavbarItem;
