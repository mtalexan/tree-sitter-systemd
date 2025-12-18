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
;; Values
;; ----------------------------

(quoted_value) @string

(unquoted_value) @string.special

