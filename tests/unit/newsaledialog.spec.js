import { mount } from '@vue/test-utils'
import NewSaleSingleUnitDialog from '../../src/components/NewSaleSingleUnitDialog.vue'

describe('NewSaleSingleUnitDialog', () => {
  it('renders props.addSaleDialog when passed', () => {
    const wrapper = mount(NewSaleSingleUnitDialog, {
      propsData: { addSaleDialog: true }
    })

    console.log(wrapper.html())
    // expect(true).toBe(true)
    expect(wrapper.find('span').text()).toBe('Show Dialog')
    // expect(wrapper.find('v-dialog').isVisible()).toBe(true)
  })
})
