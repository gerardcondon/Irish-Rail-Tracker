require_relative '../spec_helper.rb'
describe "Basic Webpage Layout", js: true, type: :feature do    
  it "should display a message" do
    visit "/"
    page.should have_content("Irish Rail Tracker")
  end
end