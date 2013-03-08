require_relative '../spec_helper.rb'
describe "Basic Webpage Layout", js: true, type: :feature do    
  it "should display a message" do
    visit "/"
    page.should have_content("Irish Rail Tracker")
  end

  it "should have a nav bar" do
    visit "/"
    page.should have_selector("#main-nav-bar")
  end
end