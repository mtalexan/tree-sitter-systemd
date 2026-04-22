;; ----------------------------
;; Comments
;; ----------------------------

(comment) @comment

;; ----------------------------
;; Sections
;; ----------------------------

(section_header) @namespace

;; ----------------------------
;; Assignments
;; ----------------------------

(assignment
  key: (key) @property)

"=" @operator

;; ----------------------------
;; Values — specific patterns first (highest priority)
;; ----------------------------

;; Quoted strings (double or single-quoted)
(quoted_value) @string

;; Boolean values (whole value is a boolean keyword)
((unquoted_value) @boolean
 (#match? @boolean "^(yes|no|true|false|on|off)$"))

;; Time durations (5min, 200ms, 1h30m, etc.)
((unquoted_value) @number
 (#match? @number "^(\\d+(us|ms|s|m|h|d|w|M|y|sec|min|seconds|minutes|hours|days|weeks|months|years|usec|msec))+$"))

;; Sizes (512K, 2G, 1.5T, infinity)
((unquoted_value) @number
 (#match? @number "^(\\d+(\\.\\d+)?[KMGT]|infinity)$"))

;; General unquoted values (fallback)
(unquoted_value) @string.special

