# @sanity/eslint-config-studio

The ESLint configuration that ships with new Sanity Studio projects.

Designed to be relatively unobtrusive to help find bugs instead enforce opinions.

## Installation

### Install

```
yarn add eslint @sanity/eslint-config-studio
```

or

```
npm install eslint @sanity/eslint-config-studio
```

### Update the configuration

Add the following to `.eslintrc`

```
{
  "extends": "@sanity/eslint-config-studio"
}
```

## Differences from [`eslint-config-sanity`](https://github.com/sanity-io/eslint-config-sanity)

|              | `eslint-config-sanity`                             | `@sanity/eslint-config-studio`                                                   |
| ------------ | -------------------------------------------------- | -------------------------------------------------------------------------------- |
| Use case     | internal projects                                  | offered publicly to be used in the [Sanity Studio](https://www.sanity.io/studio) |
| Rule set     | opinionated, enforces internal conventions         | unobtrusive, unopinionated, offered solely to catch bugs                         |
| Dependencies | contains many presets but must install each plugin | contains only one preset, but install plugins for you\*                          |

\*Note: This package utilizes [`@rushstack/eslint-patch`](https://github.com/microsoft/rushstack/tree/ebee58403b1595027da7ef00a4d817d83ecbd737/eslint/eslint-patch#what-it-does) to include plugins as dependencies. This making installation easier and allows us to manage those dependencies for you.

Since this package includes dependencies to plugins, it will never have more than one preset.

## Release new version

Run ["CI & Release" workflow](https://github.com/sanity-io/eslint-config-studio/actions).
Make sure to select the main branch and check "Release new version".

Semantic release will only release on configured branches, so it is safe to run release on any branch.

