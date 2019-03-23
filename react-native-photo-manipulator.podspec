require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name         = package['name']
  s.version      = package['version']
  s.summary      = package['description']
  s.license      = package['license']

  s.authors      = package['author']
  s.homepage     = package['homepage']
  s.platform     = :ios, "9.0"

  s.source       = { :git => "https://github.com/guhungry/react-native-photo-manipulator.git", :tag => "#{s.version}" }
  s.source_files  = "ios/**/*.{h,m}"

  s.dependency 'React'
  s.dependency 'WCPhotoManipulator', :git => 'https://github.com/guhungry/ios-photo-manipulator.git', :tag => 'v0.0.1'

  s.swift_version = "4.2"
end
