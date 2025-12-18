module.exports = grammar({
  name: "systemd",

  extras: $ => [
    /[ \t]+/, // whitespace is insignificant except inside values
  ],

  rules: {
    source_file: $ =>
      seq(
        optional($.preamble),
        repeat($.section)
      ),

    preamble: $ =>
      repeat1(
        choice(
          $.comment,
          $.assignment
        )
      ),

    section: $ =>
      seq(
        field("header", $.section_header),
        repeat(
          choice(
            $.assignment,
            $.comment
          )
        )
      ),

    section_header: _ =>
      token(seq(
        "[",
        /[A-Za-z][A-Za-z0-9]*/,
        "]"
      )),

    assignment: $ =>
      seq(
        field("key", $.key),
        optional(/[ \t]*/),
        "=",
        optional(/[ \t]*/),
        optional(field("value", $.value))
      ),

    key: _ =>
      token(/[A-Za-z][A-Za-z0-9-]*/),

    comment: _ =>
      token(seq(
        choice("#", ";"),
        /.*/
      )),

    // ---- VALUES ----

    value: $ =>
      choice(
        $.quoted_value,
        $.unquoted_value
      ),

    quoted_value: _ =>
      token(choice(
        seq(
          '"',
          repeat(choice(/[^"\\]/, /\\./)),
          '"'
        ),
        seq(
          "'",
          repeat(choice(/[^'\\]/, /\\./)),
          "'"
        )
      )),

    // Everything until end-of-line or comment
    unquoted_value: _ =>
      token(/[^#;\n][^\n]*/),
  }
});

