var DEFAULT_UNITTESTS = '# You should always import unittestparson\n' +
            'import unittestparson\n\n' +
            '# You can name your class whatever you like,\n' +
            '# but need to extend unittestparson.unittest\n' +
            'class MyTests(unittestparson.unittest):\n' +
            '  # You can define as many test functions as you like\n' +
            '  # The function name sould start with test\n' +
            '  def testAddition(self):\n' +
            '    # you can have as many assertions as you like,\n' +
            '    # parameters are (actual, expected, description)\n' +
            '    self.assertEqual(1 + 1, 2, \'Test description shown to student\')\n\n' +
            '# Always end with calling main() of a new instance of your class, and\n' +
            '# Always assign results to _test_result\n' +
            '_test_result = MyTests().main()';

export default function (state = DEFAULT_UNITTESTS, action) {
  switch (action.type) {
    case 'EDITOR/SET_UNITTESTS':
      return action.payload;
    default:
      return state;
  }
}
