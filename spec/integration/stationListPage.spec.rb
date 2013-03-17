require_relative '../spec_helper.rb'

describe "Station List Page Layout", js: true, type: :feature do    
  it "should have an accordion element" do
    visit "/"
    find("#nav-bar-station-list-button").click
    page.should have_selector("#station-list-accordion")
  end

  describe "Station List Page Accordion" do
    it "should have four parts" do
        visit "/"
        find("#nav-bar-station-list-button").click
        sleep(4)
        page.all('.accordion-group').length.should eq 4
    end

    it "should have a section for Dart trains" do
        visit "/"
        find("#nav-bar-station-list-button").click
        page.should have_selector("#station-accordion-group-D")
    end
  end
end