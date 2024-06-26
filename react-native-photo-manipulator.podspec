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
  s.source_files  = "ios/**/*.{h,m,mm}"
  s.exclude_files = "ios/Vendor/**/*.{h,m,mm}"

  s.dependency 'WCPhotoManipulator', '~> 2.2.0'

  # React Native Core dependency
  install_modules_dependencies(s)
end